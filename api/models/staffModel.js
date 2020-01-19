var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var staffSchema = Schema({
    firstName: String,
    lastName: String,
    birthDate: Date,
    gender: Boolean,
    address: String,
    mobile: String,
    skype: String,
    email: String,
    joinDate: Date,
    department: { type: Schema.Types.ObjectId, ref: 'Department' },
    histories: [{ type: Schema.Types.ObjectId, ref: 'StaffHistory' }]
        // department: {
        //     departmentName: String
        // },
        // history: {
        //     historyDate: Date,
        //     historyContent: String
        // }
});

var Staff = mongoose.model('Staff', staffSchema);

module.exports = Staff;