const tweetGrabber = require('./getRecentTweets')
const urlGrabber = require('./getTweetUrl')
const htmlGrabber = require('./getTweetHTML')
const pollLocationGrabber = require('./getVoterPollingInformation')
const e = require('express')

module.exports = (req, res) => {
  var trumpHTML = []
  var trumpIds = []
  var bidenHTML = []
  var bidenIds = []
  var pollingLocations = []
  var tweetPromises = []
  var getPollingLocations = new Promise((res, rej) => {
    pollLocationGrabber.getPollingLocation().then((response)=> {
      pollingLocations = response
    })
    res()
  })
  getPollingLocations.then((result) => {
    var prom0 = new Promise((res, rej) => {
      const tweets = tweetGrabber.getTweets("realDonaldTrump").then((response) => {
        response.data.forEach(tweet => {
          var id = tweet.id
          trumpIds.push(id)
        })
        res()
      })
    })
    var prom = new Promise((res, rej) => {
      const tweets = tweetGrabber.getTweets("JoeBiden").then((response) => {
        response.data.forEach(tweet => {
          var id = tweet.id
          bidenIds.push(id)
        })
        res()
      })
    })
    tweetPromises.push(prom0, prom)
    Promise.all(tweetPromises).then((result) => {
      promises = []
      bidenIds.forEach((tweetid) => {
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
                    bidenHTML.push(html)
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

      trumpIds.forEach((tweetid) => {
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
                    trumpHTML.push(html)
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
          layout: 'layouts/navbar',
          bidenHTML: bidenHTML,
          trumpHTML: trumpHTML,
          pollingLocations
        })
      })
    })

  })
}
