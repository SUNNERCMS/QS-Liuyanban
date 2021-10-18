// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()

exports.main = (event, context) => {
  const {
    itemTempData,
    due,
    itemid
  } = event;
  db.collection('todos').doc(itemid).update({
    data: {
      content: itemTempData.itemContent,
      due
    }
  })
  .then(res => {
    console.log(res)
  }).catch(err=> console.log(err))
}