/**
 * 添加单词章节
 */
let router = require('koa-router')()
let query = require('../utils/mysql.js')

router.post('/', async (ctx)=>{
  let json = ctx.request.body
  let _sql = "SELECT * FROM `wordbook` WHERE userid='" + json.userid +"' and chaptername='" + json.chaptername + "'"

  await query(_sql).then(rows => {
    return new Promise((resolve, reject) => {
      if (rows.length > 0) {
        ctx.body = {
          error: '02',
          message: '该章节名称已经使用'
        }
        reject(false)
      } else {
        resolve("insert into wordbook(id, userid,chaptername,chapterword) values(null,'"+json.userid+"','"+json.chaptername+"','"+json.chapterword+"');")
      }
    })
  }).then(query).then(row => {
    ctx.body = {
      error: '00',
      message: '添加成功'
    }
  }).catch(err => {
    console.log(err)
  })

})

module.exports = router