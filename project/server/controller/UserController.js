const express = require("express");
const router = express.Router();
const passport = require("../passport");
const userService = require("../service/UserService");

router.route("/login")
    .post(passport.authenticate("local"), (req, res) => {
        res.status(200).send(req.user);
    }
    )
    .get((req, res) => {
        if (req.isAuthenticated()) {
            res.json(req.user);
        } else {
            res.status(401).send();
        }
    });

router.route("/register")
    .post(userService.registerUser);

router.route("/allUsernames")
    .get(userService.getAllUsernames);

module.exports = router;
