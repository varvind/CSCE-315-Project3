


module.exports = (req, res) => {
  var font_size = 0;
  var height = 0
  if(req.session.font_size == undefined) {
    font_size = 100;
  } else {
    font_size = req.session.font_size
  }
  if(req.session.height == undefined) {
    height = 400;
  } else {
    height = req.session.height
  }
  res.render('searchPoliticians', {
    layout: 'layouts/navbar',
    tweets : [],
    names : [],
    fivethirtyeightpolls: [],
    nytimes : [],
    font_size: font_size,
    height:height
  })
}