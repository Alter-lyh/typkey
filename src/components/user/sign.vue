<template>
  <div class="main">
    <div class="sign-view">
      <p class="title">
        <a :class="[signType ? '' : 'active']" @click="signType = 0">登录</a>
        <b>·</b>
        <a :class="[signType ? 'active' : '']" @click="signType = 1">注册</a>
      </p>
      <div class="content">
        <el-form label-position="left" :model="logData" ref="logData" status-icon :rules="rules" label-width="80px" class="demo-ruleForm" v-show="!signType">
          <el-form-item label="账号" prop="userName">
            <el-input type="text" v-model="logData.userName" auto-complete="off" placeholder="账号即昵称"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="passWord">
            <el-input type="password" v-model="logData.passWord" auto-complete="off"></el-input>
          </el-form-item>
          <el-button type="primary" round @click="signIn('logData')">登录</el-button>
        </el-form>
      </div>
      <div class="content">
        <el-form label-position="left" :model="regData" ref="regData" status-icon :rules="rules" label-width="80px" class="demo-ruleForm" v-show="signType">
          <el-form-item label="账号" prop="userName">
            <el-input type="text" v-model="regData.userName" auto-complete="off" placeholder="账号即昵称"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="passWord">
            <el-input type="password" v-model="regData.passWord" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="regData.checkPass" auto-complete="off"></el-input>
          </el-form-item>
          <el-button type="success" round @click="signUp('regData')">注册</el-button>
        </el-form>
      </div>
      <p class="msg">账号系统只为了方便您的学习</p>
    </div>
  </div>
</template>

<script>
import sign from '@/api/sign'
export default {
  name: 'index',
  data () {
    let checkUsername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入账号'));
      } else {
        callback();
      }
    };
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.regData.checkPass !== '') {
          this.$refs.regData.validateField('checkPass');
        }
        callback();
      }
    };
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.regData.passWord) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      logData: {
        userName: '',
        passWord: ''
      },
      regData: {
        userName: '',
        passWord: '',
        checkPass: ''
      },
      rules: {
        userName: [
          { required: true, validator: checkUsername, trigger: 'blur' }
        ],
        passWord: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { required: true, validator: validatePass2, trigger: 'blur' }
        ]
      },
      signType: 0
    }
  },
  created () {
  },
  methods: {
    // 注册
    signUp (formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) return
        let data = {
          userName: this.regData.userName,
          passWord: this.regData.passWord
        }
        this.$http.post(sign.register, data).then(res => {
          let json = res.data
          if (json.error == '00') {
            this.$message({
              message: '注册成功，1秒后自动登录',
              type: 'success'
            })
            window.localStorage.setItem('userId', json.data.userid)
            window.localStorage.setItem('userName', json.data.username)
            this.$store.dispatch('setUserId', json.data.userid)
            this.$store.dispatch('setUserName', json.data.username)
            setTimeout(() => {
              this.$router.replace('/')
            }, 1000)
          } else {
            this.$message({
              message: json.message,
              type: 'warning'
            })
          }
        })
      });
    },
    // 登录
    signIn (formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) return
        let data = {
          userName: this.logData.userName,
          passWord: this.logData.passWord
        }
        this.$http.post(sign.login, data).then(res => {
          let json = res.data
          if (json.error == '00') {
            window.localStorage.setItem('userId', json.data.userid)
            window.localStorage.setItem('userName', json.data.username)
            this.$store.dispatch('setUserId', json.data.userid)
            this.$store.dispatch('setUserName', json.data.username)
            this.$router.replace('/')
          } else {
            this.$message({
              message: json.message,
              type: 'warning'
            })
          }
        })
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
.main{
  width: 100%;
  height: 100%;
}
.sign-view{
  width: 400px;
  height: 440px;
  background: white;
  margin: 0 auto;
  margin-top: 80px;
  border-radius: 4px;
  box-shadow: 0 0 10px #ccc;
  padding-top: 20px;
  font-family: -apple-system,SF UI Display,Arial,PingFang SC,Hiragino Sans GB,Microsoft YaHei,WenQuanYi Micro Hei,sans-serif;
  .title{
    text-align: center;
    font-weight: 600;
    font-size: 18px;
    color: #969696;
    a{
      cursor: pointer;
    }
    a,b{
      padding: 10px;
    }
    .active{
      font-weight: 700;
      color: #ea6f5a;
      border-bottom: 2px solid #ea6f5a;
    }
  }
  .content{
    width: 300px;
    margin: 0 auto;
    margin-top: 40px;
    button{
      width: 100%;
      display: block;
      margin: 0 auto;
      margin-top: 40px;
    }
  }
  .msg{
    text-align: center;
    font-size: 14px;
    color: #969696;
  }
}
</style>
