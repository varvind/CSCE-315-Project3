


module.exports = (req, res) => {
  res.render('searchPoliticians', {
    layout: 'layouts/navbar',
    tweets : [],
    names : [],
    fivethirtyeightpolls: []
  })
}