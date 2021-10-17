// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
// 保存todoItem数据
exports.main = (event, context) => {
  db.collection('todos').add({
    data: {
      content: event.itemTempData.itemContent,
      due: event.due
    }
  })
  .then(res => {
    console.log(res)
  }).catch(err=> console.log(err))
}