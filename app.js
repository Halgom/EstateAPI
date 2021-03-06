const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

require('dotenv').config();

// set up express app
const app = express();

// connect to MongoDB
let uri = "mongodb://127.0.0.1:27017/estateDB";
console.log('database connection string');
console.log(uri);
mongoose.connect(
    uri,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then(() => {
    console.log('Connection to database successful');
}).catch((err) => {
    console.error('connection failed');
    console.log(err);
});

// parse request body as JSON
app.use(bodyParser.json());

// allow Cross-Origin Resource Sharing
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// initialize routes
app.use('/api/estates', require('./routes/public'));
app.use('/api/admin/estates', require('./routes/private'));

module.exports = app;
