var express = require('express');
var mongoose = require('mongoose');
var config = require('./config');
var staffController = require('./api/controllers/staffController');
var staffHistoryController = require('./api/controllers/staffHistoryController');
var departmentController = require('./api/controllers/departmentController');
var userController = require('./api/controllers/userController');
var alalyseController = require('./api/controllers/analyseController');
var setupController = require('./api/controllers/setupController');

var app = express();
var port = process.env.PORT || 3001;

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/assets', express.static(__dirname + '/public'));
// app.use('/uploads', express.static(__dirname + '/public/images/staff'));
var cors = require('cors');
app.use(cors());

mongoose.connect(config.getDbConnectionString());
staffController(app);
staffHistoryController(app);
departmentController(app);
userController(app);
alalyseController(app);
setupController(app);

app.listen(port, function() {
    console.log('server success');
})