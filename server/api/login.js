/**
 * 登录
 */
let router = require('koa-router')()
let query = require('../utils/mysql.js')

router.post('/', async (ctx)=>{
  let json = ctx.request.body
  let _sql = "SELECT * FROM `users` WHERE username='" + json.userName +"'"

  await query(_sql).then(rows => {
    if (rows[0].password == json.passWord) {
      ctx.body = {
        error: '00',
        message: '登录成功',
        data: {
          username: rows[0].username,
          userid: rows[0].userid
        }
      }
    } else {
      ctx.body = {
        error: '02',
        message: '用户名密码不匹配'
      }
    }
  }).catch(err => {
    ctx.body = {
      error: '02',
      message: '该用户名未注册'
    }
    console.log(err)
  })
})
module.exports = router