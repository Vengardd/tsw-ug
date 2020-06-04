const express = require("express");
const router = express.Router();
const auctionService = require("../service/AuctionService");

router.route("/auctions")
    .get(auctionService.getAllAuctions);

router.route("/auction/:id")
    .get(auctionService.getAuction);

router.route("/auctions/byUser")
    .get(auctionService.getAllAuctionsByUser);

router.route("/auctions/ownBids")
    .get(auctionService.getAllAuctionsOwnBids);

router.route("/auction/addOrUpdate")
    .post(auctionService.addOrUpdateAuction);

router.route("/startAuction")
    .get(auctionService.startAuction);

router.route("/auction/buyNow/:id")
    .get(auctionService.buyNow);

router.route("/auction/endAuction/:id")
    .get(auctionService.endAuction);

router.route("/bids")
    .get(auctionService.getBids);

module.exports = router;
