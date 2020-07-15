require('../src/db/mongoose')

const User = require('../src/models/user')
const Task = require('../src/models/task')
const express = require('express')
const { ObjectId } = require('mongodb')

// 5efb59e8ce243f14a7f7da0e

// User.findByIdAndUpdate('5efb5ea620e3d7196b353200', { age: 1}).then((user) => {
//     // Console user
//     console.log(user)
//     return User.countDocuments({ age: 1})
// }).then((result) => {
//     // Show result
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })

// const updateAgeAndCount = async (id, age) => {
//     const user = await User.findByIdAndUpdate(id, { age: age })
//     const count = await User.countDocuments({ age: age })

//     return count
// }

// updateAgeAndCount('5f02ae3d989e4d1da2777429', 26).then((count) => {
//     console.log(count)
// }).catch((e) => {
//     console.log(e)
// })

const deleteTaskAndCount = async (id) => {
    const deletedCount = await Task.deleteOne({
        _id: new ObjectId(id)
    })

    const incompleteTask = await Task.countDocuments(
        { completed : false }
    )

    return incompleteTask
}

deleteTaskAndCount('5ef70c12a71c0f374790f837').then((count) => {
    console.log('Incomplete task: ' + count)
}).catch((e) => {
    console.log('Error: ' + e)
}) 