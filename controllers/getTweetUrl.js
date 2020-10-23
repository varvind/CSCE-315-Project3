require('dotenv').config({path: __dirname + '/../.env'});
const { response } = require('express');
const needle = require('needle');
// The code below sets the bearer token from your environment variables
// To set environment variables on Mac OS X, run the export command below from the terminal: 
// export BEARER_TOKEN='YOUR-TOKEN' 
const token = process.env.BEARER_TOKEN; 
const endpoint = 'https://api.twitter.com/2/tweets/'
var endpointUrl = ''


async function getRequest(tweetId) {
    endpointUrl = endpoint + tweetId
    // Edit query parameters below
    const params = {
        'tweet.fields': 'entities'
    } 

    const res = await needle('get', endpointUrl, params, { headers: {
        "authorization": `Bearer ${token}`
    }})
    if(res.body) {
        return res.body;
    } else {
        throw new Error ('Unsuccessful request')
    }
}

async function getTweetUrl(tweetId) {
    endpointUrl = ''
    try {
        // Make request
        const response = await getRequest(tweetId);
        if(response.data.entities.urls == undefined) {
          return ''
        } else {
          return response.data.entities.urls[0].expanded_url  
        }
        
    } catch(e) {
        console.log(e);
        return []
        process.exit(-1);
    }
    process.exit();
}
module.exports.getTweetUrl = getTweetUrl;