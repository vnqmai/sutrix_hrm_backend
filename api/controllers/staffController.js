var Staff = require('../models/staffModel');
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/images/staff');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
})
var upload = multer({
    storage: storage
});

function getAllStaff(res) {
    Staff.find(function(err, result) {
        if (err)
            return res.status(500).json(err);

        return res.json(result);
    })
}

module.exports = function(app) {
    app.get('/staff', function(req, res) {
        if (!req.isAuth) {
            return res.json({ status: 'ERROR', errorMessage: 'Unauthorized' });
        }
        getAllStaff(res);
    })

    app.get('/staff/:id', function(req, res) {
        if (!req.isAuth) {
            return res.json({ status: 'ERROR', errorMessage: 'Unauthorized' });
        }

        Staff.findById({ _id: req.params.id }, function(err, result) {
            if (err)
                return res.status(500).json(err);
            return res.json(result);
        });
    })

    // http://localhost:3001/staff/filter
    app.post('/staff/filter', function(req, res) {
        if (!req.isAuth) {
            return res.json({ status: 'ERROR', errorMessage: 'Unauthorized' });
        }

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
                    return res.status(500).json(err);
                return res.json(result);
            });
    })

    app.post('/staff', upload.single('image'), function(req, res) {
        if (!req.isAuth) {
            return res.json({ status: 'ERROR', errorMessage: 'Unauthorized' });
        }

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
            department: req.body.department,
            image: 'http://localhost:3001/' + req.file.path.replace('public', 'assets').split('\\').join('/')
        };
        Staff.create(staff, function(err) {
            if (err)
                return res.status(500).json(err);
            getAllStaff(res);
        })
    })

    app.put('/staff', upload.single('image'), function(req, res) {
        if (!req.isAuth) {
            return res.json({ status: 'ERROR', errorMessage: 'Unauthorized' });
        }

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
            department: req.body.department,
            image: 'http://localhost:3001/' + req.file.path.replace('public', 'assets').split('\\').join('/')
        };
        Staff.update({ _id: req.body._id }, staff, function(err) {
            if (err)
                return res.status(500).json(err);
            getAllStaff(res);
        })
    })
}