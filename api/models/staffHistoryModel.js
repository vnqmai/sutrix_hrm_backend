var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var staffHistorySchema = Schema({
    historyDate: Date,
    historyActivity: String,
    staff: { type: Schema.Types.ObjectId, ref: 'Staff' }
});

var StaffHistory = mongoose.model('StaffHistory', staffHistorySchema);

module.exports = StaffHistory;