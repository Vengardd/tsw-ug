const express = require("express");
const router = express.Router();
const Message = require("../model/message");
const User = require("../model/user");

router.route("/messages")
    .get(isLoggedIn, async (req, res) => {
        const receiver = req.query.receiver;
        const sender = req.query.sender;
        console.log("RECEIVER");
        console.log(receiver);
        console.log("SENDER");
        console.log(sender);
        const messages = await (await Message.find())
            .filter(message => (message.receiver === receiver && message.sender === sender) ||
            (message.receiver === sender && message.sender === receiver));
        res.send(messages);
        return messages;
    });

function isLoggedIn (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/");
}

module.exports = router;
