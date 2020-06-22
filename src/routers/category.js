const express = require('express');
const Category = require('../models/Category');
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
// Create Category 
router.post('/categories', upload.single('categoryImg'), async(req, res) => {
    // Create a new user
    try {
        const category = new Category();
        category.name = req.body.name;
        category.details = req.body.details;
        category.rate = req.body.rate;
        category.categoryImg = req.file.path;
        category.save();
        return res.send({ message: 'Category is Created', category });
    } catch (error) {
        res.status(400).send(error)
    }
});
// 
module.exports = router