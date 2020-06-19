const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

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
    if (!req.query.address) {
        return res.send({
            error: 'Please provide the address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({
                error: error
            })
        } 

        forecast(latitude, longitude, (error, data) => {
            if (error) {
                return res.send({
                    error: error
                })
            } else {
                res.send({
                    forecast: data,
                    location: location
                })
            }
        })

        
    })
})

app.get('/products', (req, res) => {
    // Check search
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query)
    
    res.send({
        products: []
    })
})

// Match a bundle
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Help article not found',
        name: 'Hung'
    })
})

// 404 not found
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Page not found',
        name: 'Hung'
    })
})


app.listen(3000, () => {
    console.log('Server is up on port 3000')
})