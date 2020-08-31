const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
require("../passport/passport-jwt")(passport);
// const io = require("socket.io-client");
// const socket = io.connect("http://localhost");
const socket = require('socket.io-client')('http://localhost:5000');

router.route("/bids")
    .post(passport.authenticate("jwt", { session: false }), (req, res) => {
        console.log("BID REST");
        console.log(req.user);
        console.log(req.body.auctionId);
        console.log(req.body.price);
        socket.emit("bid", {
            auctionId: req.body.auctionId,
            price: req.body.price,
            date: new Date(),
            bidder: req.user.id
        });
        res.send(200);
    });

module.exports = router;
