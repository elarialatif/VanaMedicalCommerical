const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
    //  
const technicalSchema = mongoose.Schema({
    subject: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    publishedAt: {
        type: Date,
        default: Date.now()
    }
})


const Technical = mongoose.model('Technical', technicalSchema)

module.exports = Technical