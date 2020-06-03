const express = require("express");
const router = express.Router();
const auctionService = require("../service/AuctionService");

router.route("/auctions")
    .get(auctionService.getAllAuctions);

module.exports = router;
