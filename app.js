var express = require('express');
var mongoose = require('mongoose');
var config = require('./config');
var staffController = require('./api/controllers/staffController');
var setupController = require('./api/controllers/setupController');

var app = express();
var port = process.env.PORT || 3001;

app.use('/assets', express.static(__dirname + '/public'));

mongoose.connect(config.getDbConnectionString());
staffController(app);
setupController(app);

app.listen(port, function() {
    console.log('server success');
})