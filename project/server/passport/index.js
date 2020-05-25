const passport = require("passport");
const passportLocal = require("passport-local");
const passportHttp = require("passport-http");

const User = require("../models/user");
const validateUser = (username, password, done) => {
    User.findOne({ username: username }, function (err, user) {
        if (err) {
            console.log(err);
            return done(err);
        }
        if (!user) {
            return done(null, false, { message: "Incorrect username." });
        }
        if (!user.isValidPassword(password)) {
            return done(null, false, { message: "Incorrect password." });
        }
        return done(null, user);
    });
};

passport.use(new passportLocal.Strategy(validateUser));
passport.use(new passportHttp.BasicStrategy(validateUser));
passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser((id, done) => {
    User.findOne({ _id: id }, (err, user) => {
        if (err) {
            done(err);
        }
        if (user) {
            done(null, {
                id: user._id,
                username: user.username,
                password: user.password
            });
        } else {
            done({
                msg: "Nieznany ID"
            });
        }
    });
});

module.exports = passport;
