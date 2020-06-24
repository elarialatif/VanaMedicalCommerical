// const express = require('express');
// const Product = require('../models/Product');
// // 

// const multer = require('multer')
// const storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, 'uploads/')
//     },
//     filename: function(req, file, cb) {
//         cb(null, file.originalname)
//     }
// });
// const upload = multer({ storage: storage });

// // 
// const router = express.Router();
// // Create Product 
// router.post('/products', upload.single('productImg'), async(req, res) => {
//     try {
//         const product = new Product();
//         product.name = req.body.name;
//         product.details = req.body.details;
//         product.rate = req.body.rate;
//         product.productImg = req.file.path;
//         product.save();
//         return res.send({ message: 'Product is Created', product });
//     } catch (error) {
//         res.status(400).send(error)
//     }
// });
// // 
// module.exports = router