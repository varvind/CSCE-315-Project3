const tweetGrabber = require('./getRecentTweets')
const needle = require('needle')
const production = 'https://csce-project3-production.herokuapp.com'
const dev = 'http://localhost:3000'
module.exports = (req, res) => {
  const url = (process.env.NODE_ENV ? production : dev)
  const trumpTweets = []
  const bidenTweets = []
  const tweetPromises = []
  const nytimesBiden = []
  const nytimesTrump = []
  const pollData = []
  const prom0 = new Promise((resolve, reject) => {
    tweetGrabber.getTweets('realDonaldTrump').then((response) => {
      response.data.forEach(tweet => {
        trumpTweets.push(tweet)
      })
      resolve()
    })
  })
  const prom = new Promise((resolve, reject) => {
    tweetGrabber.getTweets('JoeBiden').then((response) => {
      response.data.forEach(tweet => {
        bidenTweets.push(tweet)
      })
      resolve()
    })
  })
  tweetPromises.push(prom0, prom)

  const prom1 = new Promise((resolve, reject) => {
    needle('get', `${url}/nyt/Trump`).then((response) => {
      const data = response.body
      if (data.length > 0) {
        data.forEach(article => {
          nytimesTrump.push({ name: 'Doanld Trump', abstract: article.abstract, url: article.web_url })
        })
      } else {
        nytimesTrump.push({ name: 'Donald Trump', abstract: 'No articles for Donald Trump', url: '' })
      }
      resolve()
    })
  })

  const prom2 = new Promise((resolve, reject) => {
    needle('get', `${url}/nyt/Biden`).then((response) => {
      const data = response.body
      if (data.length > 0) {
        data.forEach(article => {
          nytimesBiden.push({ name: 'Joe Biden', abstract: article.abstract, url: article.web_url })
        })
      } else {
        nytimesBiden.push({ name: 'Joe Biden', abstract: 'No articles for Joe Biden', url: '' })
      }
      resolve()
    })
  })

  tweetPromises.push(prom1, prom2)

  Promise.all(tweetPromises).then(async (result) => {
    const prom1 = new Promise((resolve, reject) => {
      needle('get', `${url}/polls`).then((response) => {
        const data = response.body
        for (let i = 1; i < 6; i++) {
          pollData.push(data[i])
        }
      })
      resolve()
    })
    prom1.then((result) => {
      let fontSize = 0
      let height = 0
      if (req.session.font_size === undefined) {
        fontSize = 100
      } else {
        fontSize = req.session.font_size
      }
      if (req.session.height === undefined) {
        height = 400
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
        fontSize: fontSize,
        height: height
      })
    })
  })
}
