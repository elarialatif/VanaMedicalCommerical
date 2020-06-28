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
// router.put('/categories/:id', upload.single('categoryImg'), async(req, res) => {
//     Category.findById(req.params.id, function(err, category) {
//         category.name = req.body.name;
//         category.details = req.body.details;
//         category.rate = req.body.rate;
//         category.categoryImg = req.file.path;
//         category.products = req.body.products;
//         // Save Updated

//         return category.save(function(err) {
//             if (!err) {
//                 return res.send({ message: 'Category is updated', category });
//             } else {
//                 res.status(400).send(error);
//             }
//             return res.send(category);
//         });

//     });
// });
//============================
module.exports = router