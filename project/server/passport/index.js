const passport = require("passport");
const passportLocal = require("passport-local");
const passportHttp = require("passport-http");
const User = require("../models/user");
const mongoose = require("mongoose");

const validateUser = (username, password, done) => {
    User.findOne({ username: username }, function (err, user) {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false, { message: "Incorrect username." });
        }
        return done(null, user);
    });
};

passport.use(new passportLocal.Strategy(validateUser));
passport.use(new passportHttp.BasicStrategy(validateUser));

passport.serializeUser((user, done) => {
    console.log(user);
    // console.log(user._id);
    done(null, user.username);
});

passport.deserializeUser((username, done) => {
    console.log(username);
    User.findOne({ username: username }, (err, user) => {
        if (err) {
            done(err);
        }
        if (user) {
            done(null, {
                id: user._id,
                username: user.username,
                password: user.password,
                email: user.email,
                name: user.name,
                surname: user.surname
            });
        } else {
            done({
                msg: "Unknown ID"
            });
        }
    });
});

module.exports = passport;
