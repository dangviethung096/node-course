const express = require('express')
const path = require('path')
const hbs = require('hbs')


// Define path for Express config
const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')

const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views locaion
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Hung Dang Viet'
    })
})

// app.com/help
app.get('/help', (req, res) => {
    res.render('help', {
        name: 'Dang Viet Hung',
        title: 'Help'
    })
})
// app.com/about
app.get('/about', (req, res) => {
    res.render('about', {
        name: 'Dang Viet Hung',
        title: 'About'
    })
})

// app.com/weather
app.get('/weather', (req, res) => {
    res.send({
        forecast: 'Rainny',
        location: 'Ha noi',
        title: 'Weather',
        name: 'Hung'
    })
})

// Match a bundle
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Not found',
        message: 'Help not found',
        name: 'Hung'
    })
})

// 404 not found
app.get('*', (req, res) => {
    res.render('404', {
        title: 'Not found',
        message: 'Page not found',
        name: 'Hung'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})