const cloud = require('wx-server-sdk')
// 在设置 env 时指定 cloud.DYNAMIC_CURRENT_ENV 常量 (需 SDK v1.1.0 或以上) ，这样云函数内发起数据库请求、存储请求或调用其他云函数的时候，默认请求的云环境就是云函数当前所在的环境
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()

// 查询数据库集合云函数入口函数
exports.main = async (event, context) => {
  // 返回数据库查询结果
  return await db.collection('sales').get()
}