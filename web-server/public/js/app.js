// fetch('http://puzzle.mead.io/puzzle').then ((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

// messageOne.textContent = 'Forecast'
// messageTwo.textContent = 'Location'

weatherForm.addEventListener('submit', (e) => { 
    e.preventDefault()

    const location = search.value

    const url = '/weather?address=' + location

    messageOne.textContent = 'Loading ...'
    messageTwo.textContent = ''

    fetch(url).then((response) => {
        response.json().then(({ error, forecast, location }) => {
            if (error) {
                messageOne.textContent = error
            } else {
                messageOne.textContent = location
                messageTwo.textContent = forecast
            }
        })
    })

})



