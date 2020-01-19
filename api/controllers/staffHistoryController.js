var History = require('../models/staffHistoryModel');

function getAllStaffHistory(res) {
    History.find(function(err, result) {
        if (err)
            res.status(500).json(err);
        res.json(result);
    })
}

module.exports = function(app) {
    app.get('/staffHistory', function(req, res) {
        getAllStaffHistory(res);
    })

    app.get('/staffHistory/:staffId', function(req, res) {
        History.find({ staff: req.params.staffId }, function(err, result) {
            if (err)
                res.status(500).json(err);
            res.json(result);
        });
    })

    app.delete('/staffHistory/:id', function(req, res) {
        History.remove({ _id: req.params.id }, function(err) {
            if (err)
                res.status(500).json(err);
            getAllStaffHistory(res);
        })
    })
}