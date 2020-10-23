require('dotenv').config({path: __dirname + '/../.env'});
const { response } = require('express');
const needle = require('needle');
// The code below sets the bearer token from your environment variables
// To set environment variables on Mac OS X, run the export command below from the terminal: 
// export BEARER_TOKEN='YOUR-TOKEN' 
const token = process.env.BEARER_TOKEN; 
const defaultUrl = 'https://publish.twitter.com/oembed?url='
var endpointUrl = ''


async function getRequest(url) {
    endpointUrl = defaultUrl + url
    const res = await needle('get', endpointUrl)
    if(res.body) {
        return res.body;
    } else {
        throw new Error ('Unsuccessful request')
    }
}

async function getTweetHTML(url) {
    endpointUrl = ''
    try {
        // Make request
        const response = await getRequest(url);
        return response.html
    } catch(e) {
        console.log(e);
        return []
        process.exit(-1);
    }
    process.exit();
}
module.exports.getTweetHTML = getTweetHTML;