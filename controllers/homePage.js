const tweetGrabber = require('./getRecentTweets')
const needle = require('needle')
const e = require('express')
const dev = "http://localhost:3000"
const url = (process.env.NODE_ENV ? production : dev)
module.exports = (req, res) => {
  var trumpTweets = []
  var bidenTweets = []
  var tweetPromises = []
  var fivethirtyeightpolls = []
  var prom0 = new Promise((res, rej) => {
    const tweets = tweetGrabber.getTweets("realDonaldTrump").then((response) => {
      response.data.forEach(tweet => {
        trumpTweets.push(tweet)
      })
      res()
    })
  })
  tweetPromises.push(prom0)
  var prom = new Promise((res, rej) => {
    const tweets = tweetGrabber.getTweets("JoeBiden").then((response) => {
      response.data.forEach(tweet => {
        bidenTweets.push(tweet)
      })
      res()
    })
  })
  tweetPromises.push(prom)

  var prom1 = new Promise((res, rej) => {
      needle('get', `${url}/polls`).then((response) => {
        const data = response.body
        
          fivethirtyeightpolls.push({ poll: data[1]})
        
        res()   
      }) 
    })
  tweetPromises.push(prom1)
  var prom1 = new Promise((res, rej) => {
      needle('get', `${url}/polls`).then((response) => {
        const data = response.body
        
          fivethirtyeightpolls.push({ poll: data[1]})
        
        res()   
      }) 
    })
  tweetPromises.push(prom1)
   
  
  Promise.all(tweetPromises).then(async (result) => {
      
      prom1.then((result)=> {
        res.render('index', {
          layout: 'layouts/navbar',
          bidenTweets: bidenTweets,
          trumpTweets: trumpTweets,
          fivethirtyeightpolls: fivethirtyeightpolls
        })
      })  
      
  })
}
