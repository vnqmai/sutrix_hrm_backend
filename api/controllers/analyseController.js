var mongoose = require('mongoose');
var Staff = require('../models/staffModel');

module.exports = function(app) {
    app.get('/analyse', function(req, res) {
        const aggregatorOps = [{
            $group: {
                _id: '$department',
                count: { $sum: 1 }
            }
        }]
        Staff.aggregate(aggregatorOps).then(function(result) {
            res.json(result);
        })
    })
}