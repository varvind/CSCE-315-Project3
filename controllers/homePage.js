const twitter = require('../controllers/twitterAPI')
var tweets = [];
module.exports = async (req, res) => {
twitter.getTweets().then((response) => {
    response.data.forEach(tweet => {
      var text = tweet.text
      var imgs = []
      while(text.includes('https')) {
        var url = "";
        for(var i = text.indexOf("https"); i < text.length; i++) {
          if(text.charAt(i) == ' ') {
            break
          }
          url += text[i]
        }
        text = text.replace(url, " ");
        imgs.push(url)
      }
      console.log(text)
      console.log(imgs)
      tweets.push({ text: text , img:imgs })
    });
    res.render('index', {
      layout: false,
      tweets
    })
  })
}