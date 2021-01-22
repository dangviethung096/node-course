const express = require('express')
const router = new express.Router()
const Task = require('../models/task')
const auth = require('../middleware/auth')

router.post('/tasks', auth, async (req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })

    try {
        await task.save()
        // Success
        res.status(201).send(task)
    } catch (e) {
        // Fail
        res.status(500).send()
    }

})

/**
 * GET task ? limit skip
 */
router.get('/tasks', auth, async (req, res) => {
    
    try {
        const match = {};
        if (req.query.completed) {
            match.completed = req.query.completed === 'true'
        }
        
        // Get all task
        // const tasks = await Task.find({ owner : req.user._id})
        await req.user.populate({
            'path' : 'tasks',
            match,
            options : {
                limit : parseInt(req.query.limit),
                skip : parseInt(req.query.skip),
            }
        }).execPopulate()

        // Send taskss
        res.send(req.user.tasks)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        // Get task
        const task = await Task.findOne({ _id, owner : req.user._id })
        
        // Success
        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch(e) {
        // Send error
        res.status(500).send()
    }
})

router.patch('/tasks/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = [ 'description', 'completed' ]
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        // Find task
        const task = await Task.findOne({ _id : req.params.id, owner : req.user._id })
        
        if (!task) {
            return res.status(404).send()
        }

        updates.forEach(update => task[update] = req.body[update])
        
        await task.save()

        res.send(task)
    } catch (e) {
        res.status(400).send(e)
    }

})

router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        // Find and delete
        const task = await Task.findOneAndDelete({ 
            _id : req.params.id, 
            owner : req.user._id })

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