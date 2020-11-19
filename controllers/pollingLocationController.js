const pollLocationGrabber = require('./getVoterPollingInformation')

module.exports = (req, res) => {
  pollLocationGrabber.getPollingLocation().then((response) => {
    res.render('pollingLocations', {
      layout: 'layouts/navbar',
      pollingLocations: response
    })
  })
}
