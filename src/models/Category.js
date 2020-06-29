const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
    // 
var Products = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    details: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true
    },
    bonus: {
        type: String,
        required: true
    }
    // ,
    // productImg: {
    //     type: String,
    //     required: true
    // }
});
// 
const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    details: {
        type: String,
        required: true
    },
    rate: {
        type: Number,
        required: true
    },
    categoryImg: {
        type: String,
        required: true
    },
    products: [Products]
})


const Category = mongoose.model('Category', categorySchema)

module.exports = Category