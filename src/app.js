let express = require('express');
// Import Body parser
let bodyParser = require('body-parser');
// Import Mongoose
let mongoose = require('mongoose');
let app = express();
let userRouter = require('./routers/user');
// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
// Connect to Mongoose and set connection variable
mongoose.connect('mongodb://localhost/userAuth', { useNewUrlParser: true });
var db = mongoose.connection;

// Added check for DB connection
if (!db)
    console.log("Error connecting db")
else
    console.log("Db connected successfully")
var port = process.env.PORT || 8080;

require('./db/db')
require("dotenv").config();

app.use(express.json())
app.use('/api', userRouter);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})