var express = require('express');
var mongoose = require('mongoose');
var config = require('./config');
var staffController = require('./api/controllers/staffController');
var staffHistoryController = require('./api/controllers/staffHistoryController');
var departmentController = require('./api/controllers/departmentController');
var userController = require('./api/controllers/userController');
var setupController = require('./api/controllers/setupController');

var app = express();
var port = process.env.PORT || 3001;

app.use('/assets', express.static(__dirname + '/public'));
var cors = require('cors');
app.use(cors());

mongoose.connect(config.getDbConnectionString());
staffController(app);
staffHistoryController(app);
departmentController(app);
userController(app);
setupController(app);

app.listen(port, function() {
    console.log('server success');
})