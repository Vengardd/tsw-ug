const AuctionProcess = require("../models/auctionProcess");

exports.getAuctionProcessesForUser = async (req, res) => {
    const docs = await AuctionProcess.find({
        bidderId: req.user._id
    });
    return res.json(docs);
};
