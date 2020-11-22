const needle = require('needle')
const tweetGrabber = require('./getRecentTweets')
const production = 'https://csce-project3-production.herokuapp.com'
const dev = 'http://localhost:3000'
const nameToUserNameMap = {
  'Donald Trump': { twitterUName: 'realDonaldTrump', party: 'Republican', name: 'Donald Trump', imagePath: './img/trump.jpg' },
  'Joe Biden': { twitterUName: 'JoeBiden', party: 'Democrat', name: 'Joe Biden', imagePath: './img/Joe_Biden.jpg' },
  'Mike Pence': { twitterUName: 'Mike_Pence', party: 'Republican', name: 'Mike Pence', imagePath: './img/Mike_Pence.jpg' },
  'Kamala Harris': { twitterUName: 'KamalaHarris', party: 'Democrat', name: 'Kamala Harris', imagePath: './img/Kamala_Harris.jpg' },
  'Mitch McConnell': { twitterUName: 'senatemajldr', party: 'Republican', name: 'Mitch McConnell', imagePath: './img/mitch_mcconnell.jpg' },
  'Nancy Pelosi': { twitterUName: 'SpeakerPelosi', party: 'Democrat', name: 'Nancy Pelosi', imagePath: './img/nancy_pelosi.jpg' },
  'Bernie Sanders': { twitterUName: 'BernieSanders', party: 'Democrat', name: 'Bernie Sanders', imagePath: './img/bernie_sanders.jpg' },
  'Ted Cruz': { twitterUName: 'tedcruz', party: 'Republican', name: 'Ted Cruz', imagePath: './img/nancy_pelosi.jpg' },
  'Andrew Cuomo': { twitterUName: 'NYGovCuomo', party: 'Democrat', name: 'Andrew Cuomo', imagePath: './img/nancy_pelosi.jpg' },
  'Lindsey Graham': { twitterUName: 'LindseyGrahamSC', party: 'Republican', name: 'Lindsey Graham', imagePath: './img/nancy_pelosi.jpg' },
  'Jo Jorgenson': { twitterUName: 'Jorgensen4POTUS', party: 'Libertarian', name: 'Jo Jorgenson', imagePath: './img/nancy_pelosi.jpg' },
  'Spike Cohen': { twitterUName: 'RealSpikeCohen', party: 'Libertarian', name: 'Spike Cohen', imagePath: './img/nancy_pelosi.jpg' },
  'Howie Hawkins': { twitterUName: 'HowieHawkins', party: 'Green', name: 'Howie Hawkins', imagePath: './img/nancy_pelosi.jpg' },
  'Angela Walker': { twitterUName: 'AngelaNWalker', party: 'Green', name: 'Angela Walker', imagePath: './img/nancy_pelosi.jpg' },
  'Gloria Estela La Riva': { twitterUName: 'GloriaLaRiva', party: 'Party For Socialism And Liberation', name: 'Gloria Estela La Riva', imagePath: './img/nancy_pelosi.jpg' },
  'Sunil Freeman': { twitterUName: 'SunilKFree', party: 'Party For Socialism And Liberation', name: 'Sunil Freeman', imagePath: './img/nancy_pelosi.jpg' },
  'Rocky De La Fuente Guerra': { twitterUName: 'JoinRocky', party: 'Allience', name: 'Rocky De La Fuente Guerra', imagePath: './img/nancy_pelosi.jpg' },
  'Darcy Richardson': { twitterUName: 'DarcyRichardson', party: 'Allience', name: 'Darcy Richardson', imagePath: './img/nancy_pelosi.jpg' },
  'Don Blankenship': { twitterUName: 'DonBlankenship', party: 'Constitution', name: 'Don Blankenship', imagePath: './img/nancy_pelosi.jpg' },
  'Brock Pierce': { twitterUName: 'brockpierce', party: 'Independent', name: 'Brock Pierce', imagePath: './img/nancy_pelosi.jpg' },
  'Karla Ballard': { twitterUName: 'KarlaMBallard', party: 'Independent', name: 'Karla Ballard', imagePath: './img/nancy_pelosi.jpg' },
  'Jade Simmons': { twitterUName: 'jadesimmons', party: 'Independent', name: 'Jade Simmons', imagePath: './img/nancy_pelosi.jpg' }
}
module.exports = (req, res) => {
  const url = (process.env.NODE_ENV ? production : dev)
  const query = req.query.search
  const party = req.query.party
  const source = req.query.source
  const regex = new RegExp(query, 'i')
  const fivethirtyeightpolls = []
  const nytimes = []
  let politicians = []
  const names = []
  for (const name in nameToUserNameMap) {
    if (query !== '') {
      if (name.search(regex) !== -1) {
        politicians.push(nameToUserNameMap[name])
      }
    } else {
      politicians.push(nameToUserNameMap[name])
    }
  }

  if (party !== 'All') {
    if (party === 'Republican') {
      politicians = politicians.filter(obj => obj.party === 'Republican')
    } else if (party === 'Democrat') {
      politicians = politicians.filter(obj => obj.party === 'Democrat')
    } else if (party === 'Libertarian') {
      politicians = politicians.filter(obj => obj.party === 'Libertarian')
    } else if (party === 'Green') {
      politicians = politicians.filter(obj => obj.party === 'Green')
    } else if (party === 'Party For Socialism And Liberation') {
      politicians = politicians.filter(obj => obj.party === 'Party For Socialism And Liberation')
    } else if (party === 'Allience') {
      politicians = politicians.filter(obj => obj.party === 'Allience')
    } else if (party === 'Constitution') {
      politicians = politicians.filter(obj => obj.party === 'Constitution')
    } else {
      politicians = politicians.filter(obj => obj.party === 'Independent')
    }
  }

  const tweets = []
  const promises = []
  if (source === 'Twitter' || source === 'All') {
    for (let i = 0; i < politicians.length; i++) {
      const promise = new Promise((resolve, reject, index = i) => {
        tweetGrabber.getTweets(politicians[i].twitterUName).then((response) => {
          if (nytimes.length === 0) {
            names.push(politicians[index].name)
          }
          if (response.data !== undefined) {
            response.data.forEach((tweet) => {
              tweets.push({ name: politicians[index].name, uName: politicians[index].twitterUName, tweet: tweet, party: politicians[index].party, img: politicians[index].imagePath })
            })
          } else {
            tweets.push({ name: politicians[index].name, uName: politicians[index].twitterUName, tweet: { text: `No recent tweets from ${politicians[index].name}` }, party: politicians[index].party, img: politicians[index].imagePath })
          }

          resolve()
        })
      })
      promises.push(promise)
    }
  }
  if ((source === 'Five Thirty Eight' || source === 'All') && (party === 'Republican' || party === 'Democrat')) {
    const prom1 = new Promise((resolve, reject) => {
      needle('get', `${url}/polls`).then((response) => {
        const data = response.body
        for (let i = 1; i < 6; i++) {
          fivethirtyeightpolls.push({ poll: data[i] })
        }
        resolve()
      })
    })
    promises.push(prom1)
  }
  if (source === 'New York Times' || source === 'All') {
    for (let i = 0; i < politicians.length; i++) {
      const prom2 = new Promise((resolve, reject, index = i) => {
        needle('get', `${url}/nyt/${politicians[index].name} 2020`).then((response) => {
          if (tweets.length === 0) {
            names.push(politicians[index].name)
          }
          const data = response.body
          if (data.length > 0) {
            data.forEach(article => {
              nytimes.push({ name: politicians[index].name, abstract: article.abstract, url: article.web_url })
            })
          } else {
            nytimes.push({ name: politicians[index].name, abstract: `No articles for ${politicians[index].name}`, url: '' })
          }
          resolve()
        })
      })
      promises.push(prom2)
    }
  }
  Promise.all(promises).then((result) => {
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
    setTimeout(() => {
      res.render('searchPoliticians', {
        layout: 'layouts/navbar',
        tweets: tweets,
        names,
        fivethirtyeightpolls: fivethirtyeightpolls,
        nytimes: nytimes,
        fontSize: fontSize,
        height: height
      })
    }, 6000)
  })
}
