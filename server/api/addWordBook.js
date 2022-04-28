/**
 * 添加单词出(多个章节同时添加)
 * {
 *  userid: 1,
 *  wordData: [{_name: 'sd', _wordList: 'work'}]
 * }
 */
let router = require('koa-router')()
let query = require('../utils/mysql.js')

router.post('/', async (ctx)=>{
  let json = ctx.request.body
  let str = ''
  json.wordData.map(item => {
    str += "(null, '"+ json.userid +"','"+ item._name +"','"+ item._wordList +"'),"
  })
  str = str.substring(0,str.length - 1) + ";"
  let _sql = "INSERT INTO wordbook(id, userid,chaptername,chapterword) values" + str
  await query(_sql).then(row => {
    ctx.body = {
      error: '00',
      message: '添加成功'
    }
  }).catch(err => {
    console.log(err)
  })

})

module.exports = router