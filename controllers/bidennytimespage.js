module.exports = (req, res) => {

const NYT = require('nyt');
var keys = {
            'article-search':'GY0QFjjzvz8oNKAKxnENy7apKSqK0G9K',
            'best-sellers':'sample-key',
            'campaign-finance':'sample-key',
            'community':'sample-key',
            'congress':'sample-key',
            'districts':'sample-key',
            'event-listings':'sample-key',
            'geo':'sample-key',
            'most-popular':'sample-key',
            'movie-reviews':'sample-key',
            'newswire':'sample-key',
            'real-estate':'sample-key',
            'semantic':'sample-key',
            'timestags':'sample-key',
            }

var nyt = new NYT(keys);
var jsonArr = [];

var x = nyt.article.search({'query':'Biden'}, function(response){
const json = JSON.parse(response);
var final = json["response"]["docs"]
for (var key in final) {
  if (final.hasOwnProperty(key)) {
    
    jsonArr.push({"abstract": final[key]["abstract"] , "web_url": final[key]["web_url"]});
  }
}

res.send(jsonArr);
    
 
});

}