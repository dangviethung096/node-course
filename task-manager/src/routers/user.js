const express = require('express')
const User = require('../models/user')
const router = new express.Router()

router.post('/users', async (req, res) => {
    console.log('Create user')
    const user = new User(req.body)

    try {
        // save to db
        await user.save()    
        // success
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        res.send(user)
    } catch (e) {
        console.log(e.message)
        res.status(400).send()
    }
})



router.get('/users', async (req, res) => {
    try {
        const users = await User.find({})

        res.send(users)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.get('/users/:id', async (req, res) => {
    // Get id
    const id = req.params.id
    try {
        // Get user
        const user = await User.findById(id)
        if (!user) {
            return res.status(404).send()
        }

        res.send(user)

    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/users/:id', async (req, res) => {
    const id = req.params.id
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!'})
    }

    try {
        const user = await User.findById(id)
        updates.forEach((update) => {
            user[update] = req.body[update]
        })

        await user.save()

        // const user = await User.findByIdAndUpdate(id, req.body, { new : true, runValidators: true })
        

        if (!user) {
            return res.status(404).send()
        }

        res.send(user)

    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/users/:id', async (req, res) => {
    const id = req.params.id

    try {
        const user = await User.findByIdAndDelete(id)
        
        if (!user) {
            return res.status(404).send()
        }

        res.send(user)

    } catch (e) {
        res.status(400).send()
    }

})

module.exports = router