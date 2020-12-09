const jwt = require('jsonwebtoken')
const User = require('../models/user')
const constant = require('../common/constant')

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        // console.log('token ' + token + ', key = ' + constant.keyJwt)
        const decoded = jwt.verify(token, constant.keyJwt)
        // console.log(decoded)
        let user = await User.findOne({ _id : decoded._id, 'tokens.token' : token })    
        

        if (!user) {
            throw new Error()
        }

        req.user = user
        req.token = token

        next()
    } catch (e) {
        console.log(e)
        res.status(401).send({ error : "User don't authorize"})
    }
}

module.exports = auth