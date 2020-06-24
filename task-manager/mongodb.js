// CRUD

const { MongoClient, ObjectID } = require('mongodb')


const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

const id = new ObjectID()
console.log(id.id.length)
console.log(id.toHexString().length)
// console.log(id.getTimestamp())

MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database')
    }

    const db = client.db(databaseName)

    // db.collection('users').findOne({ _id: new ObjectID("5ef34df645cfff1fd7338b36") }, (error, user) => {
    //     if (error) {
    //         console.log(error)
    //     }

    //     console.log(user)
    // })

    // db.collection('users').find({ name: 'Hung' }).toArray((error, users) => {
    //     console.log(users)
    // })

    // db.collection('users').find({ name: 'Hung' }).count((error, count) => {
    //     console.log(count)
    // })

    db.collection('tasks').findOne({ _id: new ObjectID('5ef34d02894afd1ea5c07926') }, (error, user) => {
        console.log(user)
    })

    db.collection('tasks').find({ completed: true }).toArray((error, users) => {
        console.log(users)
    })
})

