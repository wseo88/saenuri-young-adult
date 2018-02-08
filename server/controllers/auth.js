const passport = require('passport');
const mongoose = require('mongoose');
const validator = require('validator');
const User = mongoose.model('User');

 sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};



module.exports.register = (req, res) => {

    const validationResult = validateRegisterForm(req.body);
    if (!validationResult.success) {
        return res.status(400).json({
            success: false,
            message: validationResult.message,
            errors: validationResult.errors
        });
    }

    let user = new User();

    user.name = req.body.name;
    user.email = req.body.email;

    user.setPassword(req.body.password);

    user.save((err) => {
        let token;
        token = user.generateJwt();
        res.status(200);
        res.json({
            "token" : token
        });
    });

};

module.exports.login = (req, res) => {

    const validationResult = validateRegisterForm(req.body);
    if (!validationResult.success) {
        return res.status(400).json({
            success: false,
            message: validationResult.message,
            errors: validationResult.errors
        });
    }

    passport.authenticate('local-login', (err, user, info) => {
        let token;

        // If Passport throws/catches an error
        if (err) {
            res.status(404).json(err);
            return;
        }

        // If a user is found
        if (user) {
            token = user.generateJwt();
            res.status(200);
            res.json({
                "token" : token
            });
        } else {
            // If user is not found
            res.status(401).json(info);
        }
    })(req, res);

};