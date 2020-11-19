const papa = require('papaparse')
const request = require('request')
const options = {/* options */}
module.exports = (req, res) => {
  const parseStream = papa.parse(papa.NODE_STREAM_INPUT, options)

  const dataStream = request
    .get('https://projects.fivethirtyeight.com/polls-page/house_polls.csv')
    .pipe(parseStream)

  const data = []
  parseStream.on('data', chunk => {
    data.push(chunk)
  })

  dataStream.on('finish', () => {
    const jsonArr = []
    for (const x of data) {
      if (x[3] === 'Texas' && x[2] === '2020') {
        jsonArr.push({ District: x[18], Date: x[19], Candidate: x[35], Party: x[36], Result: x[37] })
      }
    }

    res.send(jsonArr)
  })
}
