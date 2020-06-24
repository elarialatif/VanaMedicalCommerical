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
    try {
        const category = new Category();
        category.name = req.body.name;
        category.details = req.body.details;
        category.rate = req.body.rate;
        category.categoryImg = req.file.path;
        category.products = req.body.products;
        category.save();
        return res.send({ message: 'Category is Created', category });
    } catch (error) {
        res.status(400).send(error)
    }
});
//============================
// List All Categories
router.get('/categories', async(req, res) => {
    Category.find(function(err, category) {
        if (!err) {
            return res.send({ message: 'Categories List', category });
        } else {
            res.status(400).send(error);
        }
    });
});
//============================
// Retrieve Single Category
router.get('/categories/:id', async(req, res) => {
    Category.findById(req.params.id, function(err, category) {
        if (!err) {
            return res.send({ message: 'Category is existed', category });
        } else {
            res.status(400).send(error);
        }
    });
});
//============================
// Update Single Category
router.put('/categories/:id', upload.single('categoryImg'), async(req, res) => {
    Category.findById(req.params.id, function(err, category) {
        category.name = req.body.name;
        category.details = req.body.details;
        category.rate = req.body.rate;
        category.categoryImg = req.file.path;
        category.products = req.body.products;
        // Save Updated

        return category.save(function(err) {
            if (!err) {
                return res.send({ message: 'Category is updated', category });
            } else {
                res.status(400).send(error);
            }
            return res.send(category);
        });

    });
});
//============================
module.exports = router