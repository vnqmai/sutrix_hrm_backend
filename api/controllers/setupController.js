var Staff = require('../models/staffModel');

module.exports = function(app) {
    app.get('/api/setupStaff', function(req, res) {
        var seedStaff = { "firstName": "Tran", "lastName": "Pham Thi Huyen", "birthDate": "", "gender": false, "address": "10 Tran Quoc Toan, P7, Q3, TPHCM", "mobile": "01234 12 34 56", "skype": "sutrix.tran.pham", "email": "tran.pham@sutrixmedia.com", "joinDate": "", "department": "Backend" };
        Staff.create(seedStaff, function(err, result) {
            if (err)
                throw err;
            res.send(result);
        })
    })
}