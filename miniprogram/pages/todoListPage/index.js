Page({
  data: {
    envId: '',
    todoList: [],
    itemTempData: {
      itemContent: ''
    }
  },


  // 利用云函数查询数据库，获取列表数据
  onLoad(options) {
    this.setData({
      envId: options.envId
    }),
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

  addListItem() {
    const listLength = this.data.todoList.length;
    const addItem = {
      id: `todolist_item_th_${listLength}`,
      content: ''
    }
    this.setData({
      todoList: [...this.data.todoList, addItem]
    });
  },

  bindInput(e) {
    console.log('kkkk:', e.detail.value)
    const itemTempDataNew = {...this.data.itemTempData, itemContent: e.detail.value}
    this.setData({
      itemTempData:itemTempDataNew
    })
  },

  saveTodoItem() {
    wx.showLoading({
      title: '保存item数据',
    }),
    wx.cloud.callFunction({
      name: 'saveTodoItem',
      data: {
        itemTempData: this.data.itemTempData,
        due: new Date()
      }
    }).then((resp) => {
      // this.setData({
      //   todoList: resp.result.data
      // })
      wx.hideLoading()
    }).catch((e) => {
      console.log(e)
      wx.hideLoading()
    })
  }
})
