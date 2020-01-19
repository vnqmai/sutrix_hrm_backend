var Staff = require('../models/staffModel');
var Department = require('../models/departmentModel');
var History = require('../models/staffHistoryModel');

module.exports = function(app) {
    app.get('/api/setupStaff', function(req, res) {
        var seedStaff = { "firstName": "Tran", "lastName": "Pham Thi Huyen", "birthDate": "", "gender": false, "address": "10 Tran Quoc Toan, P7, Q3, TPHCM", "mobile": "01234 12 34 56", "skype": "sutrix.tran.pham", "email": "tran.pham@sutrixmedia.com", "joinDate": "", "department": "Backend" };
        Staff.create(seedStaff, function(err, result) {
            if (err)
                throw err;
            res.send(result);
        })
    })
    app.get('/api/setupDepartment', function(req, res) {
        var seedDepartment = [{ "departmentName": "Frontend" }, { "departmentName": "Backend" }];
        Department.create(seedDepartment, function(err, result) {
            if (err)
                res.status(500).json(err);
            res.json(result);
        })
    })
    app.get('/api/setupHistory', function(req, res) {
        var seedHistory = { "historyDate": "2010/10/20", "historyActivity": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since. Lorem Ipsum is simply dummy text of the printing and typesetting." };
        History.create(seedHistory, function(err, result) {
            if (err)
                res.status(500).json(err);
            res.json(result);
        })
    })
}