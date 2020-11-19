const papa = require('papaparse')
const request = require('request')
const options = {/* options */}
module.exports = (req, res) => {
  const parseStream = papa.parse(papa.NODE_STREAM_INPUT, options)

  const dataStream = request
    .get('https://projects.fivethirtyeight.com/2020-general-data/presidential_national_toplines_2020.csv')
    .pipe(parseStream)

  const data = []
  parseStream.on('data', chunk => {
    data.push(chunk)
  })

  dataStream.on('finish', () => {
    const jsonArr = []
    for (const x of data) {
      jsonArr.push({ Date: x[3], Candidate_1: x[4], Result_1: x[23], Candidate_2: x[5], Result_2: x[24] })
    }
    res.send(jsonArr)
  })
}
