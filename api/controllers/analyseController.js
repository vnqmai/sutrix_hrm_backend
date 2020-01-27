var mongoose = require('mongoose');
var Staff = require('../models/staffModel');

module.exports = function(app) {
    app.get('/analyse', function(req, res) {
        if (!req.isAuth) {
            return res.json({ status: 'ERROR', errorMessage: 'Unauthorized' });
        }

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