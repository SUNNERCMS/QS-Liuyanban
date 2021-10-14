Page({

  /**
   * 页面的初始数据
   */
  data: {
    showUploadTip: false,
    haveGetRecord: false,
    envId: '',
    record: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      envId: options.envId
    })
  },
  
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    wx.showLoading({
      title: '',
    })
    wx.cloud.callFunction({
      name: 'quickstartFunctions',
      config: {
        env: this.data.envId
      },
      data: {
        type: 'selectRecord'
      }
    }).then((resp) => {
      this.setData({
        record: resp.result.data
      })
      wx.hideLoading()
    }).catch((e) => {
      console.log(e)
      this.setData({
        showUploadTip: true
      })
      wx.hideLoading()
    })
  },

  updateRecord() {
    wx.navigateTo({
      url: `/pages/updateRecordResult/index?envId=${this.data.envId}`,
    })
  },

})
