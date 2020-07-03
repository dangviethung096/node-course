require('../src/db/mongoose')

const User = require('../src/models/user')

// 5efb59e8ce243f14a7f7da0e

User.findByIdAndUpdate('5efb5ea620e3d7196b353200', { age: 1}).then((user) => {
    // Console user
    console.log(user)
    return User.countDocuments({ age: 1})
}).then((result) => {
    // Show result
    console.log(result)
}).catch((e) => {
    console.log(e)
})