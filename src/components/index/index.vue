<template>
  <div class="main">
    <!-- <header class="Body-header"></header> -->
    <div class="Body-container">
      <div class="left">
        <div class="user-info">
          <div class="user-avatar"><img src="@/assets/img/typkey02.png" alt=""></div>
          <p class="user-name">加群获取单词本</p>
        </div>
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          background-color="#f4efef"
          :default-active="$route.path"
          :router="true"
          :unique-opened="true">
          <el-menu-item index="/">
            <i class="el-icon-service"></i>
            <span slot="title">开始练习</span>
          </el-menu-item>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-tickets"></i>
              <span>单词本</span>
            </template>
            <el-menu-item index="/addchapter">添加</el-menu-item>
            <el-menu-item index="/wordchaptelist">单词本列表</el-menu-item>
            <!-- <el-submenu index="2-2" v-if="wordChapteList.length">
              <template slot="title">单词本列表</template>
              <el-menu-item :index='"/addchapter/" + item._name' v-for="(item, index) in wordChapteList" :key="index">{{item._name}}</el-menu-item>
            </el-submenu> -->
          </el-submenu>
          <el-menu-item>
            <i class="el-icon-info"></i>
            <a slot="title" target="_blank" href="http://www.moguwk.com/">程序问答</a>
          </el-menu-item>
        </el-menu>
      </div>
      <div class="center">
        <keep-alive exclude="addchapter">
          <router-view/>
        </keep-alive>
      </div>
      <div class="right"></div>
    </div>
  </div>
</template>

<script>
import wordbook from '@/api/wordbook'
import wordChapteList from '@/assets/wordChapteList.json'
export default {
  name: 'index',
  data () {
    return {
    }
  },
  computed: {
    wordChapteList () {
      return this.$store.getters.getWordChapteList
    },
    islogin () {
      return !this.$store.getters.getUserId
    },
    useravatar () {
      return this.$store.getters.getUserName ? this.$store.getters.getUserName.substring(0, 1) : '临'
    },
    username () {
      return this.$store.getters.getUserName ? this.$store.getters.getUserName : '临时用户'
    }
  },
  created () {
    // 判断是否初次访问
    if (!window.localStorage.getItem('isFirstVisit')) {
      window.localStorage.setItem('isFirstVisit', 1)
      window.localStorage.setItem('wordChapteList', JSON.stringify(wordChapteList))
    }
    window.localStorage.getItem('wordChapteList') ? this.$store.dispatch('setWordChapteList', JSON.parse(window.localStorage.getItem('wordChapteList'))) : ''
  },
  beforeRouteUpdate (to, from, next) {
    if (from.path == '/sign') this.getChapter()
    next()
  },
  methods: {
    getChapter () {
      window.localStorage.setItem('wordChapteList', JSON.stringify(wordChapteList))
      this.$store.dispatch('setWordChapteList', wordChapteList)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
.main{
  width: 100%;
  min-width: 1200px;
  height: 100%;
}
.Body-header{
  width: 100%;
  height: 90px;
  border-bottom: 1px solid rgba(0,10,20,.1);
}
.Body-container{
  min-height: calc(100% - 100px);
  display: flex;
  flex-direction: row;
  .left{
    min-width: 180px;
    padding: 1rem 0;
    border-right: 1px solid rgba(0,10,20,.1);
    .user-info{
      font-weight: 400;
      color: white;
      font-family: "Arial","Microsoft YaHei","黑体","宋体",sans-serif;
      .user-avatar{
        width: 60%;
        height: auto;
        box-sizing: border-box;
        padding: 20px;
        background: white;
        border-radius: 4px;
        margin: 0 auto;
        img{
          width: 100%;
          height: auto;
          display: block;
        }
      }
      .user-name{
        text-align: center;
        color: #333;
        font-size: 14px;
        font-weight: bold;
        margin-bottom: 0;
        margin-top: 5px;
      }
    }
  }
  .center{
    width: 100%;
    height: auto;
  }
  .right{
    width: 190px;
    padding: 1rem 0;
    border-left: 1px solid rgba(0,10,20,.1);
  }
}
</style>
<style>
.el-menu{
  border-right: none;
}
.el-submenu .el-menu-item{
  min-width: 180px;
}
</style>

