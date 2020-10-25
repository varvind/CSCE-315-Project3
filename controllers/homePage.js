const tweetGrabber = require('./getRecentTweets')
const urlGrabber = require('./getTweetUrl')
const htmlGrabber = require('./getTweetHTML')
const e = require('express')

module.exports = (req, res) => {
  var tweetHTML = []
  var tweetIds = []
  var prom = new Promise((res, rej) => {
    const tweets = tweetGrabber.getTweets().then((response) => {
      response.data.forEach(tweet => {
        var id = tweet.id
        tweetIds.push(id)
      })
      res()
    })
  })
  prom.then((result) => {
    promises = []
    tweetIds.forEach((tweetid) => {
      var prom1 = new Promise((res, rej) => {
        const url = urlGrabber.getTweetUrl(tweetid).then((response) => {
          var newUrl = response
          if(newUrl.includes('photo')) {
            newUrl = newUrl.substr(0, newUrl.indexOf('photo') -1)
          } else if (newUrl.includes('video')) {
            newUrl = newUrl.substr(0, newUrl.indexOf('video') -1)
          }
          if(newUrl != '') {
            const prom2 = new Promise((res, rej) => {
              const html = htmlGrabber.getTweetHTML(newUrl).then((html) => {
                if(html != undefined) {
                  tweetHTML.push(html)
                }
                res()
              })
            }).then((result) => {
              res()
            })
          } else {
            res()
          }
        })
      })
      promises.push(prom1)
    })
    Promise.all(promises).then((result) => {
      res.render('index', {
        layout: false,
        tweetHTML
      })
    })
  })
}
