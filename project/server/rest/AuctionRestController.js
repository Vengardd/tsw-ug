const express = require("express");
const router = express.Router();
const auctionService = require("../service/AuctionService");
const passport = require("passport");
const jwt = require("jsonwebtoken");
require("../passport/passport-jwt")(passport);

router.route("/auctions")
    .get(auctionService.getAllAuctions);

router.route("/auction/:id")
    .get(auctionService.getAuction);

router.route("/auctions/byUser")
    .get(passport.authenticate("jwt", { session: false }), auctionService.getAllUserAuctions);

router.route("/auctions/ownBids")
    .get(passport.authenticate("jwt", { session: false }), auctionService.getCurrentBiddedAuctions);

router.route("/auctions/history")
    .get(passport.authenticate("jwt", { session: false }), auctionService.getAllHistoryAuctions);

router.route("/auction/addOrUpdate")
    .post(passport.authenticate("jwt", { session: false }), auctionService.addOrUpdateAuction);

router.route("/startAuction")
    .get(passport.authenticate("jwt", { session: false }), auctionService.startAuction);

router.route("/auction/buyNow/:id")
    .get(passport.authenticate("jwt", { session: false }), auctionService.buyNow);

router.route("/auction/endAuction/:id")
    .get(passport.authenticate("jwt", { session: false }), auctionService.endAuction);

router.route("/bids")
    .get(passport.authenticate("jwt", { session: false }), auctionService.getBids);

module.exports = router;
