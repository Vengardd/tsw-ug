const Auction = require("../model/auction");

const limitAuctionOnPage = 10;

exports.getAllAuctions = async (req, res) => {
    const page = req.query.page;
    const newAuction = new Auction({
        title: Math.random().toString(36).substring(7),
        description: Math.random().toString(36).substring(20),
        startDate: new Date(),
        type: "BUY",
        actualPrice: 30
    });
    await newAuction.save();
    const allAuctions = await Auction.find().limit(limitAuctionOnPage).skip((page - 1) * limitAuctionOnPage);
    res.send(allAuctions);
    return allAuctions;
};
