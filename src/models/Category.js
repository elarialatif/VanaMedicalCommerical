const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

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
    }
})

// categorySchema.pre('save', async function(next) {
//     // Hash the password before saving the user model
//     const user = this
//     if (user.isModified('password')) {
//         user.password = await bcrypt.hash(user.password, 8)
//     }
//     next()
// })


const Category = mongoose.model('Category', categorySchema)

module.exports = Category