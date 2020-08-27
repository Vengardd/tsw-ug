const passport = require("passport");
const passportLocal = require("passport-local");
const User = require("../model/user");

const validateUser = (username, password, done) => {
    User.findOne({ username: username }, async (err, user) => {
        if (err) {
            return done(err);
        }
        if (user.password !== password) {
            return done(null, false, { message: "Incorrect password." });
        }
        if (!user) {
            return done(null, false, { message: "Incorrect username." });
        }
        return done(null, user);
    });
};

passport.use(new passportLocal.Strategy(validateUser));

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
                msg: "Unknown ID"
            });
        }
    });
});

module.exports = passport;
