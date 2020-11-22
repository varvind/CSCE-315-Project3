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
  var trumppollsga = []
  var bidenpollsga = []
   var trumppollsaz = []
   var trumppollsmi = []
   var trumppollswi = []
   var trumppollspa = []
var trumppollsnv = []
var bidenpollsaz = []
   var bidenpollsmi = []
   var bidenpollswi = []
   var bidenpollspa = []
var bidenpollsnv = []
  var bidenpollsaz = []
  var prom0 = new Promise((res, rej) => {
    const tweets = tweetGrabber.getTweets("realDonaldTrump").then((response) => {
const production = 'https://csce-project3-production.herokuapp.com'
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

  tweetPromises.push(prom)

  var prom1 = new Promise((res, rej) => {
      needle('get', `${url}/polls/national`).then((response) => {
        const data = response.body
        
          fivethirtyeightpolls.push({ poll: data[1]})
         // console.log(fivethirtyeightpolls)
        res()   
      }) 
    })
  tweetPromises.push(prom1)


  var prom2 = new Promise((res, rej) => {
      needle('get', `${url}/polls/states/trump`).then((response) => {
        const data = response.body
          for(var x = 0; x< 250; x++)
            
            if(data[x].state==="Georgia"){
             // console.log(data[x].state)
               trumppollsga.push({ poll: data[x]});
               break;
            }
         //   console.log(trumppollsga)
           
        
        res()   
      }) 
    })
  tweetPromises.push(prom2)

  var prom3 = new Promise((res, rej) => {
      needle('get', `${url}/polls/states/biden`).then((response) => {
        const data = response.body
          for(var x = 0; x< 250; x++)
            
            if(data[x].state==="Georgia"){
            //  console.log(data[x].state)
               bidenpollsga.push({ poll: data[x]});
               break;
            }
         //   console.log(bidenpollsga)
           
        
        res()   
      }) 
    })
  tweetPromises.push(prom3)
   
   var prom4 = new Promise((res, rej) => {
      needle('get', `${url}/polls/states/biden`).then((response) => {
        const data = response.body
          for(var x = 0; x< 250; x++)
            
            if(data[x].state==="Arizona"){
             // console.log(data[x].state)
               bidenpollsaz.push({ poll: data[x]});
               break;
            }
          //  console.log(bidenpollsaz)
           
        
        res()   
      }) 
    })

  tweetPromises.push(prom4)
   var prom5 = new Promise((res, rej) => {
      needle('get', `${url}/polls/states/trump`).then((response) => {
        const data = response.body
          for(var x = 0; x< 250; x++)
            
            if(data[x].state==="Arizona"){
              //console.log(data[x].state)
               trumppollsaz.push({ poll: data[x]});
               break;
            }
          //  console.log(trumppollsaz)
           
        
        res()   
      }) 
    })
  tweetPromises.push(prom5)
  var prom6 = new Promise((res, rej) => {
      needle('get', `${url}/polls/states/trump`).then((response) => {
        const data = response.body
          for(var x = 0; x< 250; x++)
            
            if(data[x].state==="Pennsylvania"){
            //  console.log(data[x].state)
               trumppollspa.push({ poll: data[x]});
               break;
            }
         //   console.log(trumppollsaz)
           
        
        res()   
      }) 
    })
  tweetPromises.push(prom6)
   var prom7 = new Promise((res, rej) => {
      needle('get', `${url}/polls/states/trump`).then((response) => {
        const data = response.body
          for(var x = 0; x< 250; x++)
            
            if(data[x].state==="Michigan"){
             // console.log(data[x].state)
               trumppollsmi.push({ poll: data[x]});
               break;
            }
           // console.log(trumppollsmi)
           
        
        res()   
      }) 
    })
  tweetPromises.push(prom7)

  var prom8 = new Promise((res, rej) => {
      needle('get', `${url}/polls/states/trump`).then((response) => {
        const data = response.body
          for(var x = 0; x< 250; x++)
            
            if(data[x].state==="Wisconsin"){
           //   console.log(data[x].state)
               trumppollswi.push({ poll: data[x]});
               break;
            }
           // console.log(trumppollswi)
           
        
        res()   
      }) 
    })
  tweetPromises.push(prom8)
  

  var prom9 = new Promise((res, rej) => {
      needle('get', `${url}/polls/states/trump`).then((response) => {
        const data = response.body
          for(var x = 0; x< 250; x++)
            
            if(data[x].state==="Nevada"){
            //  console.log(data[x].state)
               trumppollsnv.push({ poll: data[x]});
               break;
            }
            //console.log(trumppollsnv)
           
        
        res()   
      }) 
    })
  tweetPromises.push(prom9)



  var prom10 = new Promise((res, rej) => {
      needle('get', `${url}/polls/states/biden`).then((response) => {
        const data = response.body
          for(var x = 0; x< 250; x++)
            
            if(data[x].state==="Pennsylvania"){
            //  console.log(data[x].state)
               bidenpollspa.push({ poll: data[x]});
               break;
            }
         //   console.log(trumppollsaz)
           
        
        res()   
      }) 
    })
  tweetPromises.push(prom10)
   var prom11 = new Promise((res, rej) => {
      needle('get', `${url}/polls/states/biden`).then((response) => {
        const data = response.body
          for(var x = 0; x< 250; x++)
            
            if(data[x].state==="Michigan"){
             // console.log(data[x].state)
               bidenpollsmi.push({ poll: data[x]});
               break;
            }
           // console.log(trumppollsmi)
           
        
        res()   
      }) 
    })
  tweetPromises.push(prom11)

  var prom12 = new Promise((res, rej) => {
      needle('get', `${url}/polls/states/biden`).then((response) => {
        const data = response.body
          for(var x = 0; x< 250; x++)
            
            if(data[x].state==="Wisconsin"){
           //   console.log(data[x].state)
               bidenpollswi.push({ poll: data[x]});
               break;
            }
           // console.log(trumppollswi)
           
        
        res()   
      }) 
    })
  tweetPromises.push(prom12)
  

  var prom13 = new Promise((res, rej) => {
      needle('get', `${url}/polls/states/biden`).then((response) => {
        const data = response.body
          for(var x = 0; x< 250; x++)
            
            if(data[x].state==="Nevada"){
            //  console.log(data[x].state)
               bidenpollsnv.push({ poll: data[x]});
               break;
            }
            //console.log(trumppollsnv)
           
        
        res()   
      }) 
    })
  tweetPromises.push(prom13)
  
  Promise.all(tweetPromises).then(async (result) => {
      
      prom1.then((result)=> {
        res.render('index', {
          layout: 'layouts/navbar',
          bidenTweets: bidenTweets,
          trumpTweets: trumpTweets,
          fivethirtyeightpolls: fivethirtyeightpolls,
          trumppollsga: trumppollsga,
          bidenpollsga: bidenpollsga,
          trumppollsaz: trumppollsaz,
          trumppollspa: trumppollspa,
          trumppollsmi: trumppollsmi,
          trumppollswi: trumppollswi,
          trumppollsnv: trumppollsnv,
          bidenpollsaz: bidenpollsaz,
          bidenpollspa: bidenpollspa,
          bidenpollsmi: bidenpollsmi,
          bidenpollswi: bidenpollswi,
          bidenpollsnv: bidenpollsnv,
          bidenpollsaz: bidenpollsaz

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
