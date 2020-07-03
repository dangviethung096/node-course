const mongoose = require('mongoose')
const Task = require('../src/models/task')

// 5ef8d14c582d0e10be88201a

Task.findByIdAndDelete('5ef8d14c582d0e10be88201a').then((task) => {
    console.log(task)
    return Task.countDocuments({ completed: false })
}).then((result) => {
    console.log(result)
}).catch((e) => {
    console.log(e)
})