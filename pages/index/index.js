//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
     author: '',
     title: '',
     date: '',
     content:''
  },
  onLoad: function () {
    var that = this;
    wx.request({
      url: 'https://interface.meiriyiwen.com/article/today?dev=1',
      success:function(res){
        var data = res.data.data
         that.setData({
           author: data.author,
           title: data.title,
           date: data.date.curr,
           content: data.content
         });
      }
    })

  }
})
