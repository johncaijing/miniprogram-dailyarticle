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

    var url;
    if (app.globalData.selectDate) {
      url = api.getDateArticleUrl(app.globalData.selectDate);
    } else if(app.globalData.random){
      url = api.getRandomArticleUrl();  
    } else {
      url = api.getNewestArticleUrl();
    }
    
    wx.request({
      url: url,
      success:function(res){
         if(res.statusCode == '200') {
           var data = res.data.data;
           var html = utils.getFormatArticle(data.content, data.title, data.author);

           if(url === api.getNewestArticleUrl()) {
              app.globalData.currDate = data.date.curr;
           }

           that.setData({
             html: html,
             date: data.date.curr
           });
         } else {
            var html = utils.get404Text(app.globalData.selectDate);
            that.setData({
              html: html,
              date: app.globalData.selectDate
            })
         }
       
      }
    })

  },
  getRandom: function(event){
     console.log('getRandom');
     app.globalData.selectDate ='';
     app.globalData.random = true;
     this.onLoad();     
  },
  getPrev: function(event) {
    console.log('prev');
    app.globalData.random = false;
    app.globalData.selectDate = utils.getPrevDate(this.data.date);
    this.onLoad();
  },
  getNext: function(event) {
    console.log('next');
    app.globalData.random = false;
    app.globalData.selectDate = utils.getNextDate(this.data.date);
    this.onLoad();
  }
})
