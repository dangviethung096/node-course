// CRUD

const { MongoClient, ObjectID } = require('mongodb')


const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

// console.log(id.getTimestamp())

MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database')
    }

    const db = client.db(databaseName)

    // db.collection('users').deleteMany({
    //     age: 11
    // }).then((result) => {
    //     // Success
    //     console.log('Success: ', result)
    // }).catch((error) => {
    //     // Fail
    //     console.log('Fail: ', error)
    // })

    db.collection('tasks').deleteOne({
        description: 'Go to work'
    }).then((result) => {
        console.log('Success: ', result)
    }).catch((error) => {
        console.log('Fail: ', error)
    })

})

