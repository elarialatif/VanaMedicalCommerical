const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
    // 

// 
const aboutSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    who_we_are: {
        type: String,
        required: true
    },
    privacy_policy: {
        type: String,
        required: true
    },
    terms_conditions: {
        type: String,
        required: true
    },
    vanaLogo: {
        type: String,
        required: true
    }
})


const AboutVana = mongoose.model('AboutVana', aboutSchema)

module.exports = AboutVana