
module.exports = (req, res) => {
  let fontSize = 0
  let height = 0
  if (req.session.font_size === undefined) {
    fontSize = 100
  } else {
    fontSize = req.session.font_size
  }
  if (req.session.height === undefined) {
    height = 400
  } else {
    height = req.session.height
  }
  res.render('searchPoliticians', {
    layout: 'layouts/navbar',
    tweets: [],
    names: [],
    fivethirtyeightpolls: [],
    nytimes: [],
    fontSize: fontSize,
    height: height
  })
}
