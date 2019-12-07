var express = require('express');
var app = express();
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var cors = require('cors');

var apiRoutes = require(path.resolve("app/routes"));
var config = require(path.resolve("app/config"));


app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Initialize the database
const Database = require('./app/config/database');
// new Database(config.mongo.port, config.mongo.host, config.mongo.name);

app.use('/api', apiRoutes);
// app.use('/api', (req,res) => {
//     res.send('abc')
// });

module.exports = app;