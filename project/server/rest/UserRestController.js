const express = require("express");
const router = express.Router();
const User = require("../model/user");
const passport = require("../passport");
const jwt = require("jsonwebtoken");
require("../passport/passport-jwt")(passport);
const userService = require("../service/UserService");

router.route("/login")
    .post(async (req, res) => {
        const { username, password } = req.body;
        try {
            const foundUser = await User.findOne({ username: username });
            const comparePasswords = password === foundUser.password;

            if (foundUser !== null && comparePasswords) {
                const token = jwt.sign({ id: foundUser._id }, "SECRET_JWT", { expiresIn: 604800 });
                return res.status(200).json({
                    token: `Bearer ${token}`
                });
            } else {
                return res.status(401);
            }
        } catch (error) {
            return res.status(400);
        }
    }
    );

router.route("/register")
    .post(userService.registerUser);

module.exports = router;
