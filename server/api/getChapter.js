/**
 * 获取单词章节
 */
let router = require('koa-router')()
let query = require('../utils/mysql.js')

router.post('/', async (ctx)=>{
  let json = ctx.request.body
  let _sql = "SELECT * FROM `wordbook` WHERE userid='" + json.userid +"'"

  await query(_sql).then(rows => {
    ctx.body = {
      error: '00',
      message: '查询成功',
      data: rows
    }
  }).catch(err => {
    ctx.body = {
      error: '03',
      message: '查询失败',
      data: []
    }
    console.log(err)
  })
})
module.exports = router