const express = require("express");
const router = express.Router();
const auctionService = require("../service/AuctionService");
const passport = require("../passport");

router.route("/auctions")
    .get(auctionService.getAllAuctions);

router.route("/auction/:id")
    .get(auctionService.getAuction);

router.route("/auctions/byUser")
    .get(isLoggedIn, auctionService.getAllUserAuctions);

router.route("/auctions/ownBids")
    .get(isLoggedIn, auctionService.getCurrentBiddedAuctions);

router.route("/auctions/history")
    .get(isLoggedIn, auctionService.getAllHistoryAuctions);

router.route("/auction/addOrUpdate")
    .post(isLoggedIn, auctionService.addOrUpdateAuction);

router.route("/startAuction")
    .get(isLoggedIn, auctionService.startAuction);

router.route("/auction/buyNow/:id")
    .get(isLoggedIn, auctionService.buyNow);

router.route("/auction/endAuction/:id")
    .get(isLoggedIn, auctionService.endAuction);

router.route("/bids")
    .get(isLoggedIn, auctionService.getBids);

function isLoggedIn (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/");
}

module.exports = router;
