var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var departmentSchema = Schema({
    departmentName: String
});

var Department = mongoose.model('Department', departmentSchema);

module.exports = Department;