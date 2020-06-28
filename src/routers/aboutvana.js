const express = require('express');
const AboutVana = require('../models/AboutVana');
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
// Create AboutVana 
router.post('/aboutVana', upload.single('vanaLogo'), async(req, res) => {
    try {
        const about = new AboutVana();
        about.name = req.body.name;
        about.who_we_are = req.body.who_we_are;
        about.privacy_policy = req.body.privacy_policy;
        about.terms_conditions = req.body.terms_conditions;
        about.vanaLogo = req.file.path;
        about.save();
        return res.send({ message: 'About is Created', about });
    } catch (error) {
        res.status(400).send(error)
    }
});
//============================
// List All AboutVana
router.get('/aboutVana', async(req, res) => {
    AboutVana.find(function(err, about) {
        if (!err) {
            return res.send({ message: 'About List', about });
        } else {
            res.status(400).send(error);
        }
    });
});

//============================
// Update Single AboutVana
router.put('/aboutVana/:id', upload.single('vanaLogo'), async(req, res) => {
    AboutVana.findById(req.params.id, function(err, about) {
        about.name = req.body.name;
        about.who_we_are = req.body.who_we_are;
        about.privacy_policy = req.body.privacy_policy;
        about.vanaLogo = req.file.path;
        about.terms_conditions = req.body.terms_conditions;
        // Save Updated

        return about.save(function(err) {
            if (!err) {
                return res.send({ message: 'About is updated', about });
            } else {
                res.status(400).send(error);
            }
            return res.send(about);
        });

    });
});
//============================
module.exports = router