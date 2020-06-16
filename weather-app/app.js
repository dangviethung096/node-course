const request = require('postman-request')

const url = 'http://api.weatherstack.com/current?access_key=a9599c10141361f74c0b1cbc90a3afec&query=21.06800339805846,105.8114519633448'

request({ url: url, json: true }, (err, res) => {
    // const data = JSON.parse(res.body).current

    // console.log(res.body.current)
    console.log('It is currently ' + res.body.current.temperature + ' degress, it feels like ' + res.body.current.feelslike + ' degress out.')
})
