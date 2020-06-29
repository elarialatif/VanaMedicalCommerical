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
var fieldUpload = upload.fields([{ name: 'categoryImg' }, { name: 'productImg' }]);
router.post('/categories', fieldUpload, async(req, res) => {
    try {
        const category = new Category();
        category.name = req.body.name;
        category.details = req.body.details;
        category.rate = req.body.rate;
        category.categoryImg = req.files['categoryImg'][0].path;
        category.products = req.body.products;
        // category.products[0].productImg = req.files['productImg'][0].path;
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
// Retrieve All Products Of Category
router.get('/products/:cat_id', async(req, res) => {
    Category.findById(req.params.cat_id, function(err, category) {
        const products = category.products;
        const productId = category.products[0].id;
        console.log(productId);
        if (!err) {
            return res.send({ message: 'Products Of Category are existed', products });
        } else {
            res.status(400).send(error);
        }
    });
});
//============================
// Retrieve Single Product 
router.get('/products/:prod_id', async(req, res) => {
    Category.findById(req.params.prod_id, function(err, category) {
        const product = category.products;
        if (!err) {
            return res.send({ message: 'Product is existed', product });
        } else {
            res.status(400).send(error);
        }
    });
});
//============================
module.exports = router