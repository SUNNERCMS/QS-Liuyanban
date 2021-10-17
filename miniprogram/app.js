// 在用户管理中会显示使用云能力的小程序的访问用户列表，默认以访问时间倒序排列，访问时间的触发点是在小程序端调用 wx.cloud.init 方法，且其中的 traceUser 参数传值为 true

// wx.cloud.init 方法接受一个可选的 options 参数，方法没有返回值。方法只能调用一次，多次调用时只有第一次调用生效。

// options 参数定义了云开发的默认配置，该配置会作为之后调用其他所有云 API 的默认配置

// env 设置只会决定小程序端 API 调用的云环境，并不会决定云函数中的 API 调用的环境，在云函数中需要通过 wx-server-sdk 的 init 方法重新设置环境。

//app.js
App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        traceUser: true, // 是否在将用户访问记录到用户管理中，在控制台中可见
      })
    }

    this.globalData = {}
  }
})
