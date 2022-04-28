<template>
  <div class="main">
    <div class="key-view">
      <div class="key-heade">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/wordchaptelist' }">单词本</el-breadcrumb-item>
          <el-breadcrumb-item>列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-button type="text" :to="{ path: '/importWord' }" @click="toImportWord">导入</el-button>
      </div>
      <div class="key-center">
        <el-tag
          :key="index"
          v-for="(tag, index) in wordChapteList"
          :disable-transitions="false"
          @click="goChapteDetails(tag)">
          {{tag._name}}
        </el-tag>
      </div>
      <div class="pagination">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="1">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'addchapter',
  data () {
    return {
      dynamicTags: [],
      inputVisible: false,
      inputValue: '',
      articleName: ''
    }
  },
  computed: {
    wordChapteList () {
      console.log(this.$store.getters.getWordChapteList)
      return this.$store.getters.getWordChapteList
    }
  },
  created () {
  },
  beforeRouteEnter (to, from, next) {
    next((vm)=>{
      
    })
  },
  beforeRouteUpdate (to, from, next) {
    
    next()
  },
  methods: {
    goChapteDetails(tag) {
      this.$router.push('/addchapter/' + tag._name)
    },
    toImportWord() {
      this.$router.push('/importWord')
    }
  }
}
</script>

<style scoped lang='less'>
.main{
  width: 100%;
  height: 100%;
  padding: 15px;
  box-sizing: border-box;
}
.key-view{
  width: 100%;
  height: 100%;
  padding: 15px;
  padding-top: 5px;
  box-sizing: border-box;
  background: white;
  border-radius: 5px;
  .key-heade{
    width: 100%;
    height: 60px;
    padding:10px 5px;
    box-sizing: border-box;
    border-bottom: 1px dashed #ccc;
    margin-bottom: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .art-name{
      width: 140px;
    }
  }
  .key-center{
    min-height: calc(100% - 140px);
  }
  .pagination{
    display: flex;
    justify-content: flex-end;
  }
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.el-tag{
  margin-top: 10px;
  cursor: pointer;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
