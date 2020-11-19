module.exports = (req, res) => {
  const NYT = require('nyt')
  const keys = {
    'article-search': 'GY0QFjjzvz8oNKAKxnENy7apKSqK0G9K',
    'best-sellers': 'sample-key',
    'campaign-finance': 'sample-key',
    community: 'sample-key',
    congress: 'sample-key',
    districts: 'sample-key',
    'event-listings': 'sample-key',
    geo: 'sample-key',
    'most-popular': 'sample-key',
    'movie-reviews': 'sample-key',
    newswire: 'sample-key',
    'real-estate': 'sample-key',
    semantic: 'sample-key',
    timestags: 'sample-key'
  }

  const nyt = new NYT(keys)
  const jsonArr = []

  nyt.article.search({ query: req.params.q }, function (response) {
    const json = JSON.parse(response)
    let final = []
    if (json.response !== undefined) {
      final = json.response.docs
    } else if (json.response !== undefined) {
      final = json.response.docs
    }
    for (const key in final) {
      if (Object.prototype.hasOwnProperty.call(final, key)) {
        jsonArr.push({ abstract: final[key].abstract, web_url: final[key].web_url })
      }
    }

    res.send(jsonArr)
  })
}
