const request = require('postman-request')

const url = 'http://api.weatherstack.com/current?access_key=a9599c10141361f74c0b1cbc90a3afec&query=21.06800339805846,105.8114519633448&units=f'
const urlGeo = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoiZGFuZ3ZpZXRodW5nMDk2IiwiYSI6ImNrYmkyYW9mZTA3dngyc3BmcGlxMzRlMGMifQ.l030FJ0ZESFmaHrVIa_Mtg&limit'

// request({ url: url, json: true }, (err, res) => {

//     console.log(res.body.current.weather_descriptions[0] + '. It is currently ' + res.body.current.temperature + ' degress, it feels like ' + res.body.current.feelslike + ' degress out.')
// })




request({ url : urlGeo, json: true}, (err, res) => {

    console.log(err)
    // const longitude = res.body.features[0].center[0]
    // const latitude = res.body.features[0].center[1]

    // console.log('Long = ' + longitude + ', Lat = ' + latitude)
})

