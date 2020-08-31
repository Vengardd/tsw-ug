const User = require("../model/user");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

opts.secretOrKey = "SECRET_JWT";

module.exports = (passport) => {
    passport.use(new JwtStrategy(opts, function (jwtPayload, done) {
        console.log("ASDASD");
        User.findById(jwtPayload.id, function (err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, { id: user._id, username: user.username });
            } else {
                return done(null, false);
            }
        });
    }));
};
