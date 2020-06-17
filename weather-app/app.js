const request = require('postman-request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const address = process.argv[2]

if (address) {
    geocode(process.argv[2], (error, { latitude, longitude, location }) => {
        if (error) {
           return console.log(error)
        } 
    
    
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return console.log(error)
            }
            
            console.log('Location ', location)
            console.log('Data', forecastData)
        })
    })    

} else {
    console.log('Please provide the address')
}



