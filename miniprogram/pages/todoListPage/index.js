Page({
  data: {
    envId: '',
    todoList: [],
    itemTempData: {
      itemContent: ''
    }
  },

  queryTodoList() {
    wx.showLoading({
      title: '获取列表数据',
    }),
    wx.cloud.callFunction({
      name: 'getTodoListData'
    }).then((resp) => {
      this.setData({
        todoList: resp.result.data
      })
      wx.hideLoading()
    }).catch((e) => {
      console.log(e)
      wx.hideLoading()
    })
  },


  // 利用云函数查询数据库，获取列表数据
  onLoad(options) {
    this.setData({
      envId: options.envId
    }),
    this.queryTodoList();
  },

  // 新增todoItem
  addListItem() {
    wx.showLoading({
      title: '新增item数据',
    }),
    wx.cloud.callFunction({
      name: 'addTodoItem',
      data: {
        itemTempData: {
          itemContent: ''
        },
        due: new Date()
      }
    }).then(() => {
      this.queryTodoList();
      wx.hideLoading()
    }).catch((e) => {
      console.log(e)
      wx.hideLoading()
    })
  },

  bindInput(e) {
    const itemTempDataNew = {...this.data.itemTempData, itemContent: e.detail.value}
    this.setData({
      itemTempData:itemTempDataNew
    })
  },

  // 更新指定的item内容
  updateTodoItem(e) {
    const {
      itemid
    } = e.currentTarget.dataset;
    wx.showLoading({
      title: '保存item数据',
    }),
    wx.cloud.callFunction({
      name: 'updateTodoItem',
      data: {
        itemTempData: this.data.itemTempData,
        due: new Date(),
        itemid
      }
    }).then(() => {
      this.queryTodoList();
      wx.hideLoading()
    }).catch((e) => {
      console.log(e)
      wx.hideLoading()
    })
  },

  // 删除具体的某一项
  deleteTodoItem(e) {
    const {
      itemid
    } = e.currentTarget.dataset;
    console.log('kkkkk:', itemid)
    wx.showLoading({
      title: '删除item数据',
    }),
    wx.cloud.callFunction({
      name: 'deleteTodoItem',
      data: {
        itemid
      }
    }).then((resp) => {
      this.queryTodoList();
      wx.hideLoading()
    }).catch((e) => {
      console.log(e)
      wx.hideLoading()
    })
  }
})
