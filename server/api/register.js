/**
 * 注册
 */
let router = require('koa-router')()
let query = require('../utils/mysql.js')

router.post('/', async (ctx)=>{
  let json = ctx.request.body
  let _sql = "SELECT * FROM `users` WHERE username='" + json.userName +"'"

  await query(_sql).then(rows => {
    return new Promise((resolve, reject) => {
      if (rows.length > 0) {
        ctx.body = {
          error: '02',
          message: '该用户名已被使用'
        }
        reject(false)
      } else {
        resolve("insert into users(userid,username,password) values(null,'"+json.userName+"','"+json.passWord+"');")
      }
    })
  }).then(query).then(row => {
    ctx.body = {
      error: '00',
      message: '注册成功',
      data: {
        username: json.userName,
        userid: row.insertId
      }
    }
  }).catch(err => {
    ctx.body = {
      error: '03',
      message: '未知错误'
    }
    console.log(err)
  })

})

module.exports = router