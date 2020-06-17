const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/userAuth', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true
})