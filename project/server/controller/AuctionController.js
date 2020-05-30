const Auction = require("../models/auction");

exports.getAllAuctions = async (req, res) => {
    const allAuctions = await Auction.find();
    res.json(allAuctions);
    return allAuctions;
};

exports.getAuctionById = async (req, res) => {
    const id = req.query.id;
    return Auction.findById(id);
};
