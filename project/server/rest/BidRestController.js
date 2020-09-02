const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const Auction = require("../model/auction");
const Bid = require("../model/auctionprocess");
const User = require("../model/user");
require("../passport/passport-jwt")(passport);

const setup = (io) => {
    router.route("/bids")
        .post(passport.authenticate("jwt", { session: false }), async (req, res) => {
            console.log("BID REST");
            const data = {
                auctionId: req.body.auctionId,
                price: req.body.price,
                date: new Date(),
                bidder: req.user.username
            };
            const auction = await Auction.findById({ _id: data.auctionId });
            if (auction.endDate > new Date()) {
                if (data.price > auction.actualPrice) {
                    const newBid = new Bid(data);
                    await newBid.save();
                    await Auction.updateOne({ _id: data.auctionId }, { $set: { actualPrice: newBid.price } });
                    io.emit("newBid", newBid);
                }
            } else {
                const bids = await Bid.find({ auctionId: auction._id })
                    .sort("price");
                const buyerName = bids[0].bidder;
                const buyer = await User.find({ username: buyerName });
                await Auction.update({ _id: auction._id }, { buyerUserId: buyer._id, buyDate: new Date() });
                io.emit("endOfAuction", auction._id);
            }
            console.log("emitted");
            res.sendStatus(200);
        });
    return router;
};
module.exports = setup;
