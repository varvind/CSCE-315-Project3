require('dotenv').config({path: __dirname + '/../.env'});
const { response } = require('express');
const needle = require('needle');
const maxTweets = 10
// The code below sets the bearer token from your environment variables
// To set environment variables on Mac OS X, run the export command below from the terminal: 
// export BEARER_TOKEN='YOUR-TOKEN' 
const token = process.env.BEARER_TOKEN; 

const endpointUrl = 'https://api.twitter.com/2/tweets/search/recent'


async function getRequest() {

    // Edit query parameters below
    const params = {
        'query': 'from:realdonaldtrump', 
        'tweet.fields': 'author_id',
        'user.fields': 'description',
        'max_results': `${maxTweets}`
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

async function getTweets() {

    try {
        // Make request
        const response = await getRequest();
        return response
    } catch(e) {
        console.log(e);
        return []
        process.exit(-1);
    }
    process.exit();
}
module.exports.getTweets = getTweets;