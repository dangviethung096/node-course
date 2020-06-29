const mongoose = require('mongoose')
const { ObjectID } = require('mongodb')
const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true
    }, 
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number')
            }
        }
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    }
})

const Task = mongoose.model('Task', {
    description: {
        type: String
    },
    completed: {
        type: Boolean
    }
})

const me = new User({
    name: '   Hung   ',
    email: '  hungdv39@viettel.com.vn  '
})

me.save().then(() => {
    console.log('Success: ', me)
}).catch((error) => {
    console.log('Error: ', error)
})

// const task = new Task({
//     _id: new ObjectID(),
//     description: 'Wake up',
//     completed: false
// })

// task.save().then((result) => {
//     console.log('Success: ', result)
// }).catch((error) => {
//     console.log('Error: ', error)
// })