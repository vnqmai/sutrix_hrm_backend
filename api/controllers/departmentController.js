var Department = require('../models/departmentModel');

function getAllDepartment(res) {
    Department.find(function(err, result) {
        if (err)
            res.status(500).json(err);
        res.json(result);
    })
}

module.exports = function(app) {
    app.get('/department', function(req, res) {
        getAllDepartment(res);
    })
}