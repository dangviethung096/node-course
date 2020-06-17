const express = require('express')
const path = require('path')


const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))


// app.com/help

app.get('/help', (req, res) => {
    res.send([{
            name: 'Dang Viet Hung',
            age: 22
        },
        {
            name: 'Hananh',
            age: 23
        }
    ])
})
// app.com/about
app.get('/about', (req, res) => {
    res.send('<h2>About</h2>')
})

app.get('/weather', (req, res) => {
    res.send({
        forecast: 'Rainny',
        location: 'Ha noi'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})