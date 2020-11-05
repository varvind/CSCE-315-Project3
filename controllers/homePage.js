const tweetGrabber = require('./getRecentTweets')
const needle = require('needle')
const e = require('express')

module.exports = (req, res) => {
  var trumpTweets = []
  var bidenTweets = []
  var tweetPromises = []
  var pollData = []
  var prom0 = new Promise((res, rej) => {
    const tweets = tweetGrabber.getTweets("realDonaldTrump").then((response) => {
      response.data.forEach(tweet => {
        trumpTweets.push(tweet)
      })
      res()
    })
  })
  var prom = new Promise((res, rej) => {
    const tweets = tweetGrabber.getTweets("JoeBiden").then((response) => {
      response.data.forEach(tweet => {
        bidenTweets.push(tweet)
      })
      res()
    })
  })
  tweetPromises.push(prom0, prom)
  
  Promise.all(tweetPromises).then(async (result) => {
      const prom1 = new Promise(async (res, rej) => {
        needle('get', 'http://localhost:3000/polls').then((response) => {
          const data = response.body
          for(var i = 1; i < 6 ; i++) {
            pollData.push(data[i])
          }
          
        })
        res()        
      })
      prom1.then((result)=> {
        res.render('index', {
          layout: 'layouts/navbar',
          bidenTweets: bidenTweets,
          trumpTweets: trumpTweets,
          pollData: pollData
        })
      })  
      
  })
}
