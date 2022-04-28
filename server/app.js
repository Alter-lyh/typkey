const Koa = require('koa');
const app = new Koa();
let bodyParser = require('koa-bodyparser');
//路径管理 node自带的模块
const path = require('path');
const static = require('koa-static');

// 配置静态web服务的中间件
app.use(static(path.join( __dirname, './www')));

//引入路由模块
let router =require('./routes')

// 处理请求数据
app.use(bodyParser())

//使用路由
app.use(router.routes()).use(router.allowedMethods())

app.listen(3000, () => {
  console.log('服务启动了 3000')
});
