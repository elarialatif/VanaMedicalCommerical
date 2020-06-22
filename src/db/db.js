const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/VanaMedical', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true
})