const Auction = require("../model/auction");

const limitAuctionOnPage = 10;

exports.getAllAuctions = async (req, res) => {
    const page = req.query.page;
    const allAuctions = await Auction.find().limit(limitAuctionOnPage).skip((page - 1) * limitAuctionOnPage);
    res.send(allAuctions);
    return allAuctions;
};
