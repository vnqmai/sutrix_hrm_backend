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

function getStaffById(req, res) {
    Staff.findOne({ _id: req.body._id }, function(err, result) {
        if (err)
            return res.status(500).json(err);
        return res.json(result);
    })
}

module.exports = function(app) {
    app.get('/staff', function(req, res) {
        // if (!req.isAuth) {
        //     return res.json({ status: 'ERROR', errorMessage: 'Unauthorized' });
        // }
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

        if (req.body.fullname === "" && req.body.department === "") {
            getAllStaff(res);
        }

        if (req.body.fullname === '' && req.body.department !== '') {
            Staff.find({ department: req.body.department }, function(err, result) {
                if (err)
                    return res.status(500).json(err);
                return res.json(result);
            });
        }

        if (req.body.fullname !== '' && req.body.department === '') {
            Staff.aggregate().project({
                    fullname: { $concat: ['$lastName', ' ', '$firstName'] },
                    firstName: 1,
                    lastName: 1,
                    birthDate: 1,
                    gender: 1,
                    address: 1,
                    id: 1,
                    mobile: 1,
                    skype: 1,
                    email: 1,
                    joinDate: 1,
                    department: 1,
                    image: 1
                }).match({ fullname: req.body.fullname })
                .exec(function(err, result) {
                    if (err)
                        return res.status(500).json(err);
                    return res.json(result);
                });
        }


        if (req.body.fullname !== '' && req.body.department !== '') {
            Staff.aggregate().project({
                    fullname: { $concat: ['$lastName', ' ', '$firstName'] },
                    firstName: 1,
                    lastName: 1,
                    birthDate: 1,
                    gender: 1,
                    address: 1,
                    id: 1,
                    mobile: 1,
                    skype: 1,
                    email: 1,
                    joinDate: 1,
                    department: 1,
                    image: 1
                }).match({ fullname: req.body.fullname, department: req.body.department })
                .exec(function(err, result) {
                    if (err)
                        return res.status(500).json(err);
                    return res.json(result);
                });
        }
    })

    app.post('/staff', upload.single('image'), function(req, res) {
        if (!req.isAuth) {
            return res.json({ status: 'ERROR', errorMessage: 'Unauthorized' });
        }

        let staff;
        if (req.file) {
            staff = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                birthDate: req.body.birthDate,
                gender: req.body.gender,
                address: req.body.address,
                id: req.body.id,
                mobile: req.body.mobile,
                skype: req.body.skype,
                email: req.body.email,
                joinDate: req.body.joinDate,
                department: req.body.department,
                image: 'https://sutrix-be.herokuapp.com/' + req.file.path.replace('public', 'assets').split('\\').join('/')
            };
        } else {
            staff = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                birthDate: req.body.birthDate,
                gender: req.body.gender,
                address: req.body.address,
                id: req.body.id,
                mobile: req.body.mobile,
                skype: req.body.skype,
                email: req.body.email,
                joinDate: req.body.joinDate,
                department: req.body.department
            };
        }

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

        let staff;
        if (req.file) {
            staff = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                birthDate: req.body.birthDate,
                gender: req.body.gender,
                address: req.body.address,
                id: req.body.id,
                mobile: req.body.mobile,
                skype: req.body.skype,
                email: req.body.email,
                joinDate: req.body.joinDate,
                department: req.body.department,
                image: 'https://sutrix-be.herokuapp.com/' + req.file.path.replace('public', 'assets').split('\\').join('/')
            };
        } else {
            staff = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                birthDate: req.body.birthDate,
                gender: req.body.gender,
                address: req.body.address,
                id: req.body.id,
                mobile: req.body.mobile,
                skype: req.body.skype,
                email: req.body.email,
                joinDate: req.body.joinDate,
                department: req.body.department
            };
        }

        Staff.update({ _id: req.body._id }, staff, function(err) {
            if (err)
                return res.status(500).json(err);
            getStaffById(req, res);
        })
    })

}