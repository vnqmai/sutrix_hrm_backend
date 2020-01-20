var User = require('../models/userModel');
var bodyParser = require('body-parser');
var jsonEncodeParder = bodyParser.json();
var bcrypt = require('bcryptjs');

module.exports = function(app) {
    app.post('/login', jsonEncodeParder, function(req, res) {
        User.findOne({ username: req.body.username }, function(err, result) {
            if (err)
                return res.status(404).json(err);
            if (result) {
                if (bcrypt.compareSync(req.body.password, result.password))
                    return res.status(500).json({ isSucces: true, errorMessege: null });
                else
                    return res.status(404).json({ isSucces: false, errorMessege: 'Password is not true.' });
            }
            return res.status(404).json({ isSucces: false, errorMessege: 'Username not found.' });
        });
    })
}