const http = require('http')

const url = 'http://api.weatherstack.com/current?access_key=a9599c10141361f74c0b1cbc90a3afec&query=45,-75&units=f'

const request = http.request(url, (response) => {
    let data = ''

    response.on('data', (chunk) => {
        data = data + chunk.toString()
        console.log(data)
    })

    response.on('end', () => {

    })
})

request.end()

