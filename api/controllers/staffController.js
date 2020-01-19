var Staff = require('../models/staffModel');
var bodyParser = require('body-parser');
var jsonEncodeParser = bodyParser.json();

function getAllStaff(res) {
    Staff.find(function(err, result) {
        if (err)
            res.status(500).json(err);

        res.json(result);
    })
}

module.exports = function(app) {
    app.get('/staff', function(req, res) {
        getAllStaff(res);
    })

    app.get('/staff/:id', function(req, res) {
        Staff.findById({ _id: req.params.id }, function(err, result) {
            if (err)
                res.status(500).json(err);
            res.json(result);
        });
    })

    app.post('/staff/filter', jsonEncodeParser, function(req, res) {
        Staff.aggregate().project({
                fullname: { $concat: ['$lastName', ' ', '$firstName'] },
                firstName: 1,
                lastName: 1,
                birthDate: 1,
                gender: 1,
                address: 1,
                mobile: 1,
                skype: 1,
                email: 1,
                joinDate: 1,
                department: 1
            }).match({ fullname: req.body.fullname, department: req.body.department })
            .exec(function(err, result) {
                if (err)
                    res.status(500).json(err);
                res.json(result);
            });
    })

    app.post('/staff', jsonEncodeParser, function(req, res) {
        var staff = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            birthDate: req.body.birthDate,
            gender: req.body.gender,
            address: req.body.address,
            mobile: req.body.mobile,
            skype: req.body.skype,
            email: req.body.email,
            joinDate: req.body.joinDate,
            department: req.body.department
        };
        Staff.create(staff, function(err) {
            if (err)
                res.status(500).json(err);
            getAllStaff(res);
        })
    })

    app.put('/staff', jsonEncodeParser, function(req, res) {
        var staff = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            birthDate: req.body.birthDate,
            gender: req.body.gender,
            address: req.body.address,
            mobile: req.body.mobile,
            skype: req.body.skype,
            email: req.body.email,
            joinDate: req.body.joinDate,
            department: req.body.department
        };
        Staff.update({ _id: req.body._id }, staff, function(err) {
            if (err)
                res.status(500).json(err);
            getAllStaff(res);
        })
    })
}