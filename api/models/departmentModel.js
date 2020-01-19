var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var departmentSchema = Schema({
    departmentName: String,
    staffs: [{ type: Schema.Types.ObjectId, ref: 'Staff' }]
});

var Department = mongoose.model('Department', departmentSchema);

module.exports = Department;