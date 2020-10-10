const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')

const router = new express.Router()


router.post('/users', async (req, res) => {
    console.log('Create user')
    const user = new User(req.body)

    try {
        // save to db
        await user.save()    
        const token = user.generateAuthToken(0)
        // success
        res.status(201).send({ user, token})
    } catch (e) {
        console.log(e.message)
        res.status(400).send(e)
    }
})

router.post('/users/login', async (req, res) => {
    console.log('Login ' + req.body.email)
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({user , token})
    } catch (e) {
        console.log(e.message)
        res.status(400).send()
    }
})

/**
 * Logout 1 session
 */
router.post('/users/logout', auth, async (req, res) => {
    console.log('[LOGOUT] logout')
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return (token.token !== req.token)
        })

        // save user
        await req.user.save()

        res.send()
    } catch (e) {
        console.log(e)
        res.status(500).send()
    }
    
})

/**
 * Logout all
 */
router.post('/users/logoutAll', auth, async (req, res) => {
    console.log('[LOGOUT ALL] logout all')
    try {
        req.user.tokens = []

        // save user
        await req.user.save()

        res.send()
    } catch (e) {
        console.log(e)
        res.status(500).send()
    }
    
})

/**
 * Read my profile
 */
router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})

router.get('/users', auth, async (req, res) => {
    try {
        const users = await User.find({})

        res.send(users)
    } catch (e) {
        res.status(500).send(e)
    }
})

/**
 * Read another profile
 */
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

router.patch('/users/me', auth, async (req, res) => {

    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!'})
    }

    try {
        updates.forEach((update) => {
            console.log('Update = ' + update + ", value = " + req.body[update]  + ', oldValue = ' + req.user[update])
            req.user[update] = req.body[update]
        })

        await req.user.save()

        res.send(req.user)
    } catch (e) {
        console.log(e)
        res.status(400).send()
    }
})

router.delete('/users/me', auth, async (req, res) => {
    try {
        // Remove user
        await req.user.remove()

        res.send(req.user)
    } catch (e) {
        console.log(e)
        res.status(400).send()
    }
})

module.exports = router