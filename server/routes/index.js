let router = require('koa-router')()

// 为路由分层添加全局配置
router.prefix('/api')

// 引入api文件
let login = require('../api/login.js')
let register = require('../api/register.js')
// 增加
let addChapter = require('../api/addChapter.js')
// 批量增加
let addWordBook = require('../api/addWordBook.js')
// 获取
let getChapter = require('../api/getChapter.js')
// 删除
let deleteChapter = require('../api/deleteChapter.js')

// 在根路由中注册子路由
router.use('/login', login.routes())
router.use('/register', register.routes())
router.use('/addChapter', addChapter.routes())
router.use('/addWordBook', addWordBook.routes())
router.use('/getChapter', getChapter.routes())
router.use('/deleteChapter', deleteChapter.routes())

module.exports = router
