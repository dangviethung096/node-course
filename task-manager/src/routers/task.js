const express = require('express')
const router = new express.Router()
const Task = require('../models/task')

router.post('/tasks', async (req, res) => {
    const task = new Task(req.body)

    try {
        await task.save()
        // Success
        res.status(201).send(task)
    } catch (e) {
        // Fail
        res.status(500).send()
    }

})

router.get('/tasks', async (req, res) => {
    try {
        // Get all task
        const tasks = await Task.find({})
        // Send tasks
        res.send(tasks)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/tasks/:id', async (req, res) => {
    try {
        const id = req.params.id
        // Get task
        const task = await Task.findById(id)
        // Success
        res.send(task)
    } catch(e) {
        // Send error
        res.status(500).send()
    }
})

router.patch('/tasks/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = [ 'description', 'completed' ]
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        // const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new : true, runValidators: true})
        const task = await Task.findById(req.params.id)
        
        updates.forEach(update => task[update] = req.body[update])
        
        task.save()

        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(400).send(e)
    }

})

router.delete('/tasks/:id', async (req, res) => {
    const id = req.params.id

    try {
        const task = await Task.findByIdAndDelete(id)

        if (task) {
            // Success
            res.send(task)
        } else {
            // Fail
            res.status(404).send()
        }

    } catch (e) {
        res.status(400).send(e)
    }

})

module.exports = router