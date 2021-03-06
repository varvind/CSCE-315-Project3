const path = require('path')
require('dotenv').config({ path: path.join('/../.env') })
const needle = require('needle')
// The code below sets the bearer token from your environment variables
// To set environment variables on Mac OS X, run the export command below from the terminal:
// export BEARER_TOKEN='YOUR-TOKEN'
const key = process.env.GOOGLE_KEY
const endpoint = 'https://www.googleapis.com/civicinfo/v2/voterinfo'
let endpointUrl = ''

async function getRequest () {
  endpointUrl = endpoint
  // Edit query parameters below
  const params = {
    key: key,
    address: '711 University Dr, College Station, TX 77840'
  }

  const res = await needle('get', endpointUrl, params, {
    headers: {
      authorization: ''
    }
  })
  if (res.body) {
    return res.body
  } else {
    throw new Error('Unsuccessful request')
  }
}

async function getPollingLocation () {
  endpointUrl = ''
  try {
    // Make request
    const response = await getRequest()
    if (response.pollingLocations === undefined) {
      return []
    } else {
      return response.pollingLocations
    }
  } catch (e) {
    console.log(e)
    return []
  }
}

getPollingLocation()
module.exports.getPollingLocation = getPollingLocation
