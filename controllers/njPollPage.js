const papa = require('papaparse')
const request = require('request')
const options = {/* options */}
module.exports = (req, res) => {
  const parseStream = papa.parse(papa.NODE_STREAM_INPUT, options)

  const dataStream = request
    .get('https://projects.fivethirtyeight.com/polls-page/senate_polls.csv')
    .pipe(parseStream)

  const data = []
  parseStream.on('data', chunk => {
    data.push(chunk)
  })

  dataStream.on('finish', () => {
    const jsonArr = []
    for (const x of data) {
      if (x[3] === 'New Jersey' && x[2] === '2020') {
        jsonArr.push({ Date: x[20], Candidate: x[33], Party: x[36], Result: x[37] })
      }
    }

    res.send(jsonArr)
  })
}
