<template>
  <div class="main">
    <div class="key-view">
      <div class="key-heade">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/wordchaptelist' }">单词本</el-breadcrumb-item>
          <el-breadcrumb-item>{{navTitle}}</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="art-name" v-if="navTitle === '添加'">
          <el-input
            placeholder="请输入文章名称"
            size="small"
            v-model="articleName"
            autofocus="true"
            ref="textinput"
            clearable>
          </el-input>
        </div>
        <el-button type="text" v-else @click="exportText">导出</el-button>
      </div>
      <div class="key-center">
        <el-tag
          :key="index"
          v-for="(tag, index) in dynamicTags"
          closable
          :disable-transitions="false"
          @close="handleClose(tag)">
          {{tag}}
        </el-tag>
        <el-input
          class="input-new-tag"
          v-if="inputVisible"
          v-model="inputValue"
          ref="saveTagInput"
          size="small"
          @keyup.enter.native="handleInputConfirm"
          @blur="handleInputConfirm"
        >
        </el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
      </div>
      <div class="key-foot">
        <el-button type="primary" size="small" icon="el-icon-success" @click="ensureText"></el-button>
        <el-button type="danger" size="small" icon="el-icon-delete" @click="deleteText"></el-button>
      </div>
    </div>
  </div>
</template>

<script>
// 导出json文件
import FileSaver from 'file-saver'
export default {
  name: 'addchapter',
  data () {
    return {
      navTitle: '添加',
      dynamicTags: [],
      inputVisible: false,
      inputValue: '',
      articleName: '',
      wordChapteList: window.localStorage.getItem('wordChapteList') ? JSON.parse(window.localStorage.getItem('wordChapteList')) : []
    }
  },
  created () {
  },
  beforeRouteEnter (to, from, next) {
    next((vm)=>{
      if (to.params.id) {
        vm.navTitle = to.params.id
        vm.wordChapteList.map((item) => {
          if (item._name === vm.navTitle) vm.dynamicTags = item._wordList.split(' ')
        })
      } else {
        vm.navTitle = '添加'
        vm.dynamicTags = []
      }
    })
  },
  beforeRouteUpdate (to, from, next) {
    if (to.params.id) {
      this.navTitle = to.params.id
      this.wordChapteList.map((item) => {
        if (item._name === this.navTitle) this.dynamicTags = item._wordList.split(' ')
      })
    } else {
      this.navTitle = '添加'
      this.dynamicTags = []
    }
    next()
  },
  methods: {
    exportText() {
      // 将json转换成字符串
      const textStr = this.dynamicTags.join(' ')
      const blob = new Blob([textStr], {type: ''})
      FileSaver.saveAs(blob, this.navTitle+'.txt')
    },
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = '';
    },
    // 保存
    ensureText () {
      if (this.dynamicTags.length === 0 && this.navTitle === '添加') {
        this.$message({
          message: '请填写要保存的单词',
          type: 'warning'
        })
        return
      }
      if (this.articleName === '' && this.navTitle === '添加') {
        this.$message({
          message: '请输入文章名字',
          type: 'warning'
        })
        this.$refs.textinput.focus()
        return
      }
      if (this.wordChapteList.some(item => item._name === this.articleName)) {
        this.$message({
          message: '单词本名字已存在',
          type: 'warning'
        })
        this.$refs.textinput.focus()
        return
      }
      this.dynamicTags.map((item,i) => {
        this.dynamicTags[i] = item.trim()
      })
      // 章节内容
      let wordList = this.dynamicTags.join(' ')
      // 本地单词本添加数据
      if (this.navTitle === '添加') {
        this.wordChapteList.push({
          _name: this.articleName,
          _wordList: wordList
        })
      } else {
        this.wordChapteList.map((item, i) => {
          if (item._name === this.navTitle) this.wordChapteList[i]._wordList = wordList
        })
      }
      window.localStorage.setItem('wordChapteList', JSON.stringify(this.wordChapteList))
      this.$store.dispatch('setWordChapteList', this.wordChapteList)
      this.$router.push('/addchapter/' + this.articleName)
    },
    // 删除
    deleteText () {
      this.$confirm('此操作将永久删除该单词本, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 本地删除单词章节
        this.wordChapteList.map((item, i) => {
          if (item._name === this.navTitle) this.wordChapteList.splice(i,1)
        })
        window.localStorage.setItem('wordChapteList', JSON.stringify(this.wordChapteList))
        this.$store.dispatch('setWordChapteList', this.wordChapteList)
        if (this.$store.getters.getWordChapteList.length > 0) {
          this.$router.replace('/addchapter/' + this.$store.getters.getWordChapteList[0]._name)
        } else {
          this.$router.replace('/addchapter')
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })        
      })
    }
  }
}
</script>

<style scoped lang='less'>
.main{
  width: 100%;
  height: auto;
  padding: 15px;
  box-sizing: border-box;
}
.key-view{
  width: 100%;
  height: auto;
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
    min-height: 300px;
  }
  .key-foot{
    width: 100%;
    height: auto;
    padding:10px 5px;
    box-sizing: border-box;
    border-top: 1px dashed #ccc;
    margin-top: 15px;
    display: flex;
    justify-content: flex-end;
  }
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.el-tag{
  margin-top: 10px;
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
