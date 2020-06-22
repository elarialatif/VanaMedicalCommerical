const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');
const Cookies = require('cookies');
// 

const multer = require('multer')
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
});
const upload = multer({ storage: storage });

// 
const router = express.Router();
// Create User = Register
var fieldUpload = upload.fields([{ name: 'taxCard' }, { name: 'copyOfCommericalRegistration' }]);
router.post('/users', fieldUpload, async(req, res) => {
    // Create a new user
    try {
        const user = new User();
        user.name = req.body.name;
        user.email = req.body.email;
        user.password = req.body.password;
        user.phoneNumber = req.body.phoneNumber;
        user.address = req.body.address;
        user.shareCode = req.body.shareCode;
        user.copyOfCommericalRegistration = req.files['copyOfCommericalRegistration'][0].path;
        user.taxCard = req.files['taxCard'][0].path;
        user.generateAuthToken();
        res.send(user);
    } catch (error) {
        res.status(400).send(error)
    }
});
//Login a registered user
router.post('/users/login', async(req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findByCredentials(email, password)
        if (!user) {
            return res.status(401).send({ error: 'Login failed! Check authentication credentials' })
        }
        const token = user.token
        cookies = new Cookies(req, res);
        await cookies.set('name', user.token)
            // res.send(cookies.get('name'))
        res.send(user)
    } catch (error) {
        res.status(400).send({ error: error.message })
    }

});
// View logged in user profile
router.get('/users/me', async(req, res) => {
    cookies = new Cookies(req, res);
    const token = await cookies.get('name');
    const user = await User.findByToken(token)
    res.send(user)
});
// Log user out of the application
router.post('/users/me/logout', async(req, res) => {
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
});
// Log user out of all devices
// router.post('/users/me/logoutall', auth, async(req, res) => {
//     try {
//         req.user.tokens.splice(0, req.user.tokens.length)
//         await req.user.save()
//         res.send()
//     } catch (error) {
//         res.status(500).send(error)
//     }
// })
//forgetpassword
router.post('/users/forgetPassword', async(req, res) => {
    try {
        const { email } = req.body
        const user = await User.findByEmail(email)
        if (!user) {
            return res.status(401).send({ error: 'Email is not existed!' });
        }
        return res.send({ message: 'Email is existed', user });
    } catch (error) {
        res.status(400).send({ error: error.message })
    }

});
module.exports = router