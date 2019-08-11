//index.js
//获取应用实例
const app = getApp();
var utils = require('./../../utils/util.js');
var api = require('./../../api/api.js');
var storage = require('./../../utils/storage.js');

var parseData = (data)=> {
  var html = utils.getFormatArticle(data.content, data.title, data.author);
  return html;
};

Page({
  data: {
     html:'',
     date: ''
  },
  onLoad: function () {
    var that = this;
    var url;
    if (app.globalData.selectDate) {
      var selectDate = app.globalData.selectDate;

      if(storage.hasKey(selectDate)) {
        const data = storage.read(selectDate);
        if(data) {
          var d = JSON.parse(data);
          var html;
          if(d.is404) {
            html = utils.get404Text(selectDate);
          } else {
            html = parseData(d);
          }
          that.setData({
            html:html,
            date:selectDate
          });
          return;
        }
      }

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
           app.globalData.selectDate = data.date.curr;
           storage.save(data.date.curr,JSON.stringify(data));
           if (url === api.getNewestArticleUrl()) {
             var ymd = utils.getYMD(data.date.curr);
             app.globalData.currDate = utils.getDateByYMD(ymd.year, ymd.month, ymd.day);
           }
           var html = parseData(data);
           that.setData({
             html: html,
             date: data.date.curr
           });
         } else {
            var html = utils.get404Text(app.globalData.selectDate);
           storage.save(app.globalData.selectDate, JSON.stringify({
             is404: true
           }));
            that.setData({
              html: html,
              date: app.globalData.selectDate
            })
         }
       
      }
    })

  },
  getRandom: function(event){
     app.globalData.selectDate ='';
     app.globalData.random = true;
     this.onLoad();     
  },
  getPrev: function(event) {
    app.globalData.random = false;
    app.globalData.selectDate = utils.getPrevDate(this.data.date);
    this.onLoad();
  },
  getNext: function(event) {
    app.globalData.random = false;
    var next = utils.getNextDate(this.data.date);
    
    var nextYMD = utils.getYMD(next);
    var nextDate = utils.getDateByYMD(nextYMD.year,nextYMD.month,nextYMD.day);

    if(nextDate.getTime() > app.globalData.currDate.getTime()) {
      wx.showToast({
        title: '没有更新的了',
        duration: 2000
      })
      return;
    }

    app.globalData.selectDate = next;
    this.onLoad();
  },
  onShareAppMessage:function(res){
    return {
      title: '每日一文',
      path: `/pages/index/index?date=${app.globalData.selectDate}`
    }
  }
})
