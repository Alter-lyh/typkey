/**
 * 删除单词章节
 */
let router = require('koa-router')()
let query = require('../utils/mysql.js')

router.post('/', async (ctx)=>{
  let json = ctx.request.body
  let _sql = "SELECT * FROM `wordbook` WHERE userid='" + json.userid +"' and chaptername='" + json.chaptername + "'"

  await query(_sql).then(rows => {
    return new Promise((resolve, reject) => {
      if (rows.length == 0) {
        ctx.body = {
          error: '02',
          message: '该章节已被删除'
        }
        reject(false)
      } else {
        resolve("DELETE  FROM `wordbook` WHERE userid='" + json.userid +"' and chaptername='" + json.chaptername + "'")
      }
    })
  }).then(query).then(row => {
    ctx.body = {
      error: '00',
      message: '删除成功'
    }
  }).catch(err => {
    console.log(err)
  })

})

module.exports = router