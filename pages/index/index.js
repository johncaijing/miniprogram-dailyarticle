//index.js
//获取应用实例
const app = getApp();
var utils = require('./../../utils/util.js');

Page({
  data: {
     html:'',
     date: ''
  },
  onLoad: function () {
    var that = this;
    wx.request({
      url: 'https://interface.meiriyiwen.com/article/today?dev=1',
      success:function(res){
         var data = res.data.data;
         var html = utils.getFormatArticle(data.content,data.title,data.author);
         that.setData({
            html: html,
            date: data.date.curr
         });
      }
    })

  }
})
