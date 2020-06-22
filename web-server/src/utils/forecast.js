const request = require("postman-request")

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=a9599c10141361f74c0b1cbc90a3afec&query=' + latitude + ',' + longitude
    
    request({ url, json: true}, (err, {body}) => {
        
        if (err) {
            callback('Unable connect to weather service', undefined)
        } else if (body.error) {
            callback('Invalid url', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + 
                '. Temperature = ' + body.current.temperature + 
                ', Humidity = ' + body.current.humidity + '%')
        }
    })
}

module.exports = forecast