if(process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const app = new express()

const ejs = require('ejs')
const bodyParser = require('body-parser')
const path = require('path')
const methodOverride = require('method-override')
const expressLayouts = require('express-ejs-layouts')


app.use(bodyParser.json())
app.use(expressLayouts)
app.use(bodyParser.urlencoded({ extended: true }))

app.use(methodOverride('_method'))

app.use(express.static(__dirname))
app.set('view engine', 'ejs')

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

const homePageController = require('./controllers/homePage')


app.get('/', homePageController)