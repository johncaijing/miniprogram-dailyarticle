const getDateArticleUrl = (date)=> {
  return `https://interface.meiriyiwen.com/article/day?dev=1&date=${date}`;
}

const getNewestArticleUrl = ()=> {
  return 'https://interface.meiriyiwen.com/article/today?dev=1';
}

module.exports = {
  getDateArticleUrl: getDateArticleUrl,
  getNewestArticleUrl: getNewestArticleUrl
}