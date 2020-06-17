const express = require('express')
const User = require('../models/User')
const auth = require('../middleware/auth')
const Cookies = require('cookies')

const router = express.Router()

router.post('/users', async(req, res) => {
    // Create a new user
    try {
        const user = new User();
        user.name = req.body.name;
        user.email = req.body.email;
        user.password = req.body.password;
        user.generateAuthToken();
        res.send(user);
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/users/login', async(req, res) => {
    //Login a registered user
    try {
        const { email, password } = req.body
        const user = await User.findByCredentials(email, password)
        if (!user) {
            return res.status(401).send({ error: 'Login failed! Check authentication credentials' })
        }
        const token = user.token
        cookies = new Cookies(req, res);
        await cookies.set('name', user.token)
        res.send(cookies.get('name'))
    } catch (error) {
        res.status(400).send({ error: error.message })
    }

})

router.get('/users/me', async(req, res) => {
    // View logged in user profile
    cookies = new Cookies(req, res);
    const token = await cookies.get('name');
    const user = await User.findByToken(token)
    res.send(user)
})

router.post('/users/me/logout', async(req, res) => {
    // Log user out of the application
    try {
        // req.user.tokens = req.user.tokens.filter((token) => {
        //     return token.token != req.token
        // })
        cookies = new Cookies(req, res);
        cookies.set('name', { expires: Date.now() });
        // await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
})

// router.post('/users/me/logoutall', auth, async(req, res) => {
//     // Log user out of all devices
//     try {
//         req.user.tokens.splice(0, req.user.tokens.length)
//         await req.user.save()
//         res.send()
//     } catch (error) {
//         res.status(500).send(error)
//     }
// })

module.exports = router