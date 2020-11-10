const e = require('express')
const needle = require('needle')
const tweetGrabber = require('./getRecentTweets')
const nameToUserNameMap = { 'Donald Trump': {twitterUName: 'realDonaldTrump', party: 'Republican', name : 'Donald Trump', imagePath: './img/trump.jpg'}, 
                            'Joe Biden': {twitterUName: 'JoeBiden', party : 'Democrat', name : 'Joe Biden', imagePath: './img/Joe_Biden.jpg'},
                            'Mike Pence': {twitterUName: 'Mike_Pence', party : 'Republican', name : 'Mike Pence', imagePath: './img/Mike_Pence.jpg'},
                            'Kamala Harris' : {twitterUName: 'KamalaHarris', party : 'Democrat', name : 'Kamala Harris', imagePath: './img/Kamala_Harris.jpg'},
                            'Mitch McConnell' : {twitterUName: 'senatemajldr', party : 'Republican', name : 'Mitch McConnell', imagePath: './img/mitch_mcconnell.jpg'},
                            'Nancy Pelosi' : {twitterUName: 'SpeakerPelosi', party : 'Democrat', name : 'Nancy Pelosi', imagePath: './img/nancy_pelosi.jpg'}}
module.exports = (req, res) => {
  const query = req.query.search
  const party = req.query.party
  const source = req.query.source
  const regex = new RegExp(query, 'i')
  var fivethirtyeightpolls = []
  var politicians = []
  var names = []
  for (name in nameToUserNameMap) {
    if(query != "") {
      if(name.search(regex) != -1) {
        politicians.push(nameToUserNameMap[name])
      }
    } else {
      politicians.push(nameToUserNameMap[name])
    }
  }

  if(party != "All") {
    if(party == 'Republicans') {
      politicians = politicians.filter(obj => obj.party == 'Republican')
    } else {
      politicians = politicians.filter(obj => obj.party == 'Democrat')
    }
  }
  
  var tweets = []
  var promises = []
  if(source == "Twitter" || source == "All") {
    for(var i =0 ; i< politicians.length; i++) {
      names.push(politicians[i].name)
      var promise = new Promise((res, rej, index = i) => {
        tweetGrabber.getTweets(politicians[i].twitterUName).then((response) => {
          response.data.forEach((tweet) => {
            tweets.push({name : politicians[index].name, uName : politicians[index].twitterUName, tweet: tweet, party : politicians[index].party, img: politicians[index].imagePath })
          })
          res()
        })
        
      })
      promises.push(promise)
    }
  } 
  if (source == "Five Thirty Eight" || source == "All") {

    var prom1 = new Promise((res, rej) => {
      needle('get', 'http://localhost:3000/polls').then((response) => {
        const data = response.body
        for(var i = 1; i < 6 ; i++) {
          fivethirtyeightpolls.push({ poll: data[i]})
        }
        res()   
      })
           
    })
    promises.push(prom1)
    
  }
  Promise.all(promises).then((result) => {
    res.render('searchPoliticians', {
      layout: 'layouts/navbar',
      tweets: tweets,
      names,
      fivethirtyeightpolls : fivethirtyeightpolls
    })
  })

}