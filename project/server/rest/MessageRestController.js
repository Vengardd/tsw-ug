const express = require("express");
const router = express.Router();
const Message = require("../model/message");
const passport = require("passport");
const jwt = require("jsonwebtoken");
require("../passport/passport-jwt")(passport);

router.route("/messages")
    .get(passport.authenticate("jwt", { session: false }), async (req, res) => {
        const receiver = req.query.receiver;
        const sender = req.user.username;
        const messages = await (await Message.find())
            .filter(message => (message.receiver === receiver && message.sender === sender) ||
            (message.receiver === sender && message.sender === receiver));
        res.send(messages);
        return messages;
    });

module.exports = router;
