
const save = (key, value, success, fail, complete)=> {
  try{
    wx.setStorage({
      key: key,
      data: value,
      fail: function () {
        console.log('fail');
        fail && fail();
      },
      success: function () {
        success && success();
      },
      complete: function () {
        complete && complete();
      }
    })
  }catch(e){
    console.log(e);
  }
}

const read = (key, success, fail, complete)=> {
  try{
    return wx.getStorageSync(key);
  } catch(e) {
    console.log(e)
    return '';
  }
}

const hasKey = (key)=> {
  try {
    const res = wx.getStorageInfoSync()
    return res.keys.indexOf(key) !== -1; 
  } catch (e) {
    return false
  }
}

module.exports={
  save: save,
  read: read,
  hasKey: hasKey
}