const tweetGrabber = require('./getRecentTweets')
const needle = require('needle')
const e = require('express')
const production = "https://csce-project3-production.herokuapp.com"
const dev = "http://localhost:3000"
module.exports = (req, res) => {
  const url = (process.env.NODE_ENV ? production : dev)
  var trumpTweets = []
  var bidenTweets = []
  var tweetPromises = []
  var nytimesBiden = []
  var nytimesTrump = []
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


  var prom1 = new Promise((res, rej) => {
    needle('get', `${url}/nyt/Trump`).then((response) => {
      const data = response.body
      if(data.length > 0) {
        data.forEach(article => {
          nytimesTrump.push({ name: 'Doanld Trump', abstract: article.abstract, url: article.web_url })
        })
      } else {
        nytimesTrump.push({ name: 'Donald Trump', abstract: `No articles for Donald Trump`, url: '' })
      }
      res()   
    }) 
  })

  var prom2 = new Promise((res, rej) => {
    needle('get', `${url}/nyt/Biden`).then((response) => {
      const data = response.body
      if(data.length > 0) {
        data.forEach(article => {
          nytimesBiden.push({ name: 'Joe Biden', abstract: article.abstract, url: article.web_url })
        })
      } else {
        nytimesBiden.push({ name: 'Joe Biden', abstract: `No articles for Joe Biden`, url: '' })
      }
      res()   
    }) 
  })


  tweetPromises.push(prom1, prom2)









  
  Promise.all(tweetPromises).then(async (result) => {
      const prom1 = new Promise(async (res, rej) => {
        needle('get',`${url}/polls`).then((response) => {
          const data = response.body
          for(var i = 1; i < 6 ; i++) {
            pollData.push(data[i])
          }
          
        })
        res()        
      })
      prom1.then((result)=> {
        var font_size = 0;
        var height = 0
        if(req.session.font_size == undefined) {
          font_size = 100;
        } else {
          font_size = req.session.font_size
        }
        if(req.session.height == undefined) {
          height = 400;
        } else {
          height = req.session.height
        }
        res.render('index', {
          layout: 'layouts/navbar',
          bidenTweets: bidenTweets,
          trumpTweets: trumpTweets,
          nytimesBiden: nytimesBiden,
          nytimesTrump: nytimesTrump,
          pollData: pollData,
          font_size: font_size,
          height:height
        })
      })  
      
  })
}
