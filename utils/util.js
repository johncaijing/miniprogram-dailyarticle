const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return [year, month, day].map(formatNumber).join('') 
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const getFormatArticle = (content, title, author)=> {
  return `<h2 style="text-align:center">${title}</h2>
        <div style="text-align:right;margin-right:10px">${author}</div>
        ${content}`;
}

const get404Text = (date)=> {
  return `<div style="text-align:center">${date}的文章找不到哟</div>`
}

const getPrevDate = (date) => {
   var d = new Date(date.substring(0,4),date.substring(4,6)-1,date.substring(6,8));
   d.setDate(d.getDate() - 1);
   return formatTime(d);
}

const getNextDate = (date) => {

  var d = new Date(date.substring(0, 4), date.substring(4, 6) - 1, date.substring(6, 8));
  d.setDate(d.getDate() + 1);
  return formatTime(d);
}

const getYMD = (date) => {
  var year = date.substring(0, 4);
  var month =  date.substring(4, 6) - 1;
  var day = date.substring(6, 8);
  return {
    year: year,
    month: month,
    day: day
  }
}

const getDateByYMD = (year, month, day) => {
  return new Date(year,month,day);
}

module.exports = {
  formatTime: formatTime,
  getFormatArticle: getFormatArticle,
  getPrevDate: getPrevDate,
  getNextDate: getNextDate,
  get404Text: get404Text,
  getYMD: getYMD,
  getDateByYMD: getDateByYMD
}
