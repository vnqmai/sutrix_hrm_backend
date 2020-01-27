var Department = require('../models/departmentModel');

function getAllDepartment(res) {
    Department.find(function(err, result) {
        if (err)
            res.status(500).json(err);
        res.json(result);
    })
}

module.exports = function(app) {
    // http://localhost:3001/department
    app.get('/department', function(req, res) {
        if (!req.isAuth) {
            return res.json({ status: 'ERROR', errorMessage: 'Unauthorized' });
        }

        getAllDepartment(res);
    })
}