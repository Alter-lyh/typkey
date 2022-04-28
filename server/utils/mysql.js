const mysql = require('mysql')
const mysqlConfig = {
  connectionLimit :100,  //最大链接数 一般设置为 100
  host:'localhost',
  port: 3306,
  user:'root',
  password:'12345656',
  database:'typing'
}
let pool=mysql.createPool(mysqlConfig)
//query用来操作数据库表
let query = function(sql, values) {
  return new Promise((resolve, reject)=>{
    // pool.getConnection(function (err,connection) {
    //   if(err){ reject(err);
    //   }else{  
    //     connection.query(sql,values,(err,rows)=>{
    //       if(err){ 
    //         reject(err);
    //       }else{
    //         resolve(rows); 
    //       }   
    //       connection.release(); //为每一个请求都建立一个connection使用完后调用connection.release(); 直接释放资源。 
    //     })
    //   } 
    // }) 
    pool.query(sql, values ,(err,rows)=>{
      if (err) {
        reject(err);
      }else{
        resolve(rows);
      }
    })
  })
}
module.exports = query