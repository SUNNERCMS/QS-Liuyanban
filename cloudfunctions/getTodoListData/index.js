// 获取todolist列表数据的云函数

const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
const _ = db.command

exports.main = async (event, context) => {
  const {
    searchkey
  } = event;
  if(!searchkey) {
    // 获取全部列表数据；实际只能获取前20条数据
    return await db.collection('todos').orderBy('_id', 'desc').get()
  } else {
    return await db.collection('todos').where(_.or([
      {
        content: db.RegExp({
          regexp: `${searchkey}`,
          options: 'i'
        })
      },
      {
        due: db.RegExp({
          regexp: `${searchkey}`,
          options: 'i'
        })
      }
    ])
    ).get()
  }
}