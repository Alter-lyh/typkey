<template>
  <div class="main">
    <div class="key-view">
      <div class="key-heade">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/wordchaptelist' }">单词本</el-breadcrumb-item>
          <el-breadcrumb-item>导入文件</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="key-center">
        <el-form ref="form" :model="form" :rules="rules" label-width="120px">
            <el-form-item label="单词本名称" prop="name">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="单词本文件">
                <el-upload
                    class="upload-demo"
                    action="./"
                    accept="text/plain"  
                    :limit="1"
                    :file-list="fileList"
                    :on-change="changePreview"
                    :auto-upload="false">
                    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传txt文件，且不超过100kb</div>
                </el-upload>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit('form')">导入</el-button>
                <el-button @click="goBack">取消</el-button>
            </el-form-item>
        </el-form>
        <div class="qqinfo">
          <img src="@/assets/img/typkey.png" alt="">
          <p>加群获取单词本</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'addchapter',
  data () {
    return {
      form: {
        name: ''
      },
      rules: {
        name: [
            { required: true, message: '请输入单词本名称', trigger: 'blur' },
            { min: 3, max: 16, message: '长度在 3 到 16 个字符', trigger: 'blur' }
        ]
      },
      file: null,
      fileList: [],
      wordChapteList: window.localStorage.getItem('wordChapteList') ? JSON.parse(window.localStorage.getItem('wordChapteList')) : []
    }
  },
  computed: {
  },
  beforeCreate() {
    // 读取文件
    FileReader.prototype.reading = function ({encode} = pms) {
        let bytes = new Uint8Array(this.result);    //无符号整型数组
        let text = new TextDecoder(encode || 'UTF-8').decode(bytes);
        return text;
    };
    /* 重写readAsBinaryString函数 */
    FileReader.prototype.readAsBinaryString = function (f) {
        if (!this.onload)       //如果this未重写onload函数，则创建一个公共处理方式
            this.onload = e => {  //在this.onload函数中，完成公共处理
                let rs = this.reading();
            };
        this.readAsArrayBuffer(f);  //内部会回调this.onload方法
    };
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
    changePreview(file, fileList) {
        this.file = file
        this.fileList = fileList
    },
    // 保存
    onSubmit (formName) {
        this.$refs[formName].validate((valid) => {
            if (!valid) return false;
            if (this.file == null) {
                this.$message({
                    message: '请选择单词本文件',
                    type: 'warning'
                })
                return
            }
            this.read(this.file.raw);
        });
    },
    read(f) {
        let rd = new FileReader();
        let _this = this
        rd.onload = e => {
            let cont = rd.reading({encode: 'GBK'});
            _this.addWordChapter(cont)
        };
        rd.readAsBinaryString(f);
    },
    addWordChapter(wordList) {
        this.wordChapteList.push({
          _name: this.form.name,
          _wordList: wordList
        })
        window.localStorage.setItem('wordChapteList', JSON.stringify(this.wordChapteList))
        this.$store.dispatch('setWordChapteList', this.wordChapteList)
        this.$message({
            message: '单词本导入成功',
            type: 'success'
        })
        window.history.go(-1)
    },
    // 返回
    goBack () {
      window.history.go(-1)
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
    min-height: 200px;
    display: flex;
    justify-content: space-between;
    .el-form{
        width: 340px;
    }
    .qqinfo{
      p{
        text-align: center;
        color: #333;
        font-size: 14px;
        font-weight: bold;
        margin-top: 0;
      }
    }
  }
}
</style>
