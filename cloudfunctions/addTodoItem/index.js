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
      due,
      createTime: db.serverDate()//新增记录时设置字段为服务端时间, 如果只设置新增时有服务端时间，那么更新时无，效果：排序始终按照初创时间排序
    }
  })
  .then(res => {
    console.log(res)
  }).catch(err=> console.log(err))
}