//index.js
//获取应用实例
const app = getApp();
var utils = require('./../../utils/util.js');
var api = require('./../../api/api.js');

Page({
  data: {
     html:'',
     date: ''
  },
  onLoad: function () {
    var that = this;
    var url = api.getNewestArticleUrl();
    
    wx.request({
      url: url,
      success:function(res){
         if(res.statusCode == '200') {
           var data = res.data.data;
           var html = utils.getFormatArticle(data.content, data.title, data.author);

           that.setData({
             html: html,
             date: data.date.curr
           });
         } else {
           console.log(`error fetch article`)
         }
       
      }
    })

  }
})
