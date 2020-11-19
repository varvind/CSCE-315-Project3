
module.exports = (req, res) => {
  req.session.font_size = req.params.font_size
  req.session.height = req.params.height
  if (req.params.page === 'index') {
    res.redirect('/')
  } else if (req.params.page === 'search') {
    res.redirect('/politician_search')
  }
}
