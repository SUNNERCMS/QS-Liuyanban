const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
// 新增todoItem数据
exports.main = (event, context) => {
  const {
    tempCommonData,
    due
  } = event;
  db.collection('todos').add({
    data: {
      content: tempCommonData,
      due
    }
  })
  .then(res => {
    console.log(res)
  }).catch(err=> console.log(err))
}