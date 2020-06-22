let express = require('express');
// Import Body parser
let bodyParser = require('body-parser');
// Import Mongoose
let mongoose = require('mongoose');
//


// 
let app = express();

let userRouter = require('./routers/user');
let categoryRouter = require('./routers/category');
// for parsing application/xwww-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}));
// for parsing application/json
app.use(bodyParser.json());
// Connect to Mongoose and set connection variable
mongoose.connect('mongodb://localhost/VanaMedical', { useNewUrlParser: true });
var db = mongoose.connection;

// Added check for DB connection
if (!db)
    console.log("Error connecting db")
else
    console.log("Db connected successfully")
var port = process.env.PORT || 8080;

require('./db/db')
require("dotenv").config();


// for parsing multipart/form-data
// app.use(upload.array());
app.use(express.static('public'));


app.use(express.json())
app.use('/api', userRouter);
app.use('/api', categoryRouter);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})