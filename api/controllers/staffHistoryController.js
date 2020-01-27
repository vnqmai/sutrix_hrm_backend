var History = require('../models/staffHistoryModel');
var bodyParser = require('body-parser');
var jsonEncodeParser = bodyParser.json();

function getAllStaffHistory(res) {
    History.find(function(err, result) {
        if (err)
            return res.status(500).json(err);
        return res.json(result);
    })
}

module.exports = function(app) {
    app.get('/staffHistory', function(req, res) {
        if (!req.isAuth) {
            return res.json({ status: 'ERROR', errorMessage: 'Unauthorized' });
        }

        getAllStaffHistory(res);
    })

    app.get('/staffHistory/:staffId', function(req, res) {
        if (!req.isAuth) {
            return res.json({ status: 'ERROR', errorMessage: 'Unauthorized' });
        }

        History.find({ staff: req.params.staffId }, function(err, result) {
            if (err)
                return res.status(500).json(err);
            return res.json(result);
        });
    })

    app.delete('/staffHistory/:id', function(req, res) {
        if (!req.isAuth) {
            return res.json({ status: 'ERROR', errorMessage: 'Unauthorized' });
        }

        History.remove({ _id: req.params.id }, function(err) {
            if (err)
                return res.status(500).json(err);
            getAllStaffHistory(res);
        })
    })

    app.post('/staffHistory', jsonEncodeParser, function(req, res) {
        if (!req.isAuth) {
            return res.json({ status: 'ERROR', errorMessage: 'Unauthorized' });
        }

        var staffHistory = { historyDate: new Date(), historyActivity: req.body.historyActivity, staff: req.body.staff };
        History.create(staffHistory, function(err) {
            if (err)
                return res.status(500).json(err);
            getAllStaffHistory(res);
        })
    })
}