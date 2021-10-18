Page({
  data: {
    envId: '',
    todoList: [],
    tempCommonData: '', // item修改数据时的通用临时数据容器
    searchkey: '' // 搜索关键词
  },

  queryTodoList() {
    wx.showLoading({
      title: '获取列表数据',
    }),
    wx.cloud.callFunction({
      name: 'getTodoListData',
      data: {
        searchkey: this.data.searchkey
      }
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
        tempCommonData: '',
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
    this.setData({
      tempCommonData:e.detail.value
    })
  },

  bindSearchInput(e) {
    this.setData({
      searchkey:e.detail.value
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
        tempCommonData: this.data.tempCommonData,
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
