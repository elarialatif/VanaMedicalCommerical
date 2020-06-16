var mongoose = require('mongoose');
// Setup schema
var userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    shareCode: {
        type: String,
        required: true
    },
    copyOfCommericalRegistration: {
        type: String,
        data: Buffer,
        required: true
    },
    taxCard: {
        type: String,
        data: Buffer,
        required: true
    },
    create_date: {
        type: Date,
        default: Date.now
    }
});
// Export User model
var User = module.exports = mongoose.model('user', userSchema);
module.exports.get = function(callback, limit) {
    User.find(callback).limit(limit);
}