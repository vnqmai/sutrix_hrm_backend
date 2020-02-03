var History = require('../models/staffHistoryModel');
var bodyParser = require('body-parser');
var jsonEncodeParser = bodyParser.json();

function findHistoryByStaffId(res, staffId) {
    History.find({ staff: staffId }, function(err, result) {
        if (err)
            return res.status(500).json(err);
        return res.json(result);
    });
}

module.exports = function(app) {

    app.get('/staffHistory/:staffId', function(req, res) {
        if (!req.isAuth) {
            return res.json({ status: 'ERROR', errorMessage: 'Unauthorized' });
        }

        findHistoryByStaffId(res, req.params.staffId);
    })

    app.delete('/staffHistory/:id', function(req, res) {
        // if (!req.isAuth) {
        //     return res.json({ status: 'ERROR', errorMessage: 'Unauthorized' });
        // }

        History.findOne({ _id: req.params.id }, function(err, removedItem) {
            if (err)
                return res.status(500).json(err);

            History.deleteOne({ _id: req.params.id }, function(err) {
                if (err)
                    return res.status(500).json(err);
                findHistoryByStaffId(res, removedItem.staff);
            })
        });
    })

    app.post('/staffHistory', jsonEncodeParser, function(req, res) {
        if (!req.isAuth) {
            return res.json({ status: 'ERROR', errorMessage: 'Unauthorized' });
        }

        var staffHistory = { historyDate: new Date(), historyActivity: req.body.historyActivity, staff: req.body.staff };
        History.create(staffHistory, function(err) {
            if (err)
                return res.status(500).json(err);
            findHistoryByStaffId(res, req.body.staff);
        })
    })
}