const cron = require("node-cron");
const Auction = require("../model/auction");
const Bid = require("../model/auctionprocess");
const User = require("../model/user");

const setup = (io) => {
    cron.schedule("0/20 * * * * *", async () => {
        const allAuctions = await Auction.find({
            endDate: {
                $lt: new Date()
            },
            buyDate: {
                $eq: null
            }
        });
        allAuctions.forEach(async auction => {
            auction.buyDate = auction.endDate;
            if (auction.type === "BID") {
                const highestBids = await Bid.find({ auctionId: auction._id })
                    .sort("-price")
                    .exec();
                const highestBid = highestBids[0];
                console.log();
                console.log();
                console.log(highestBid);
                if (highestBid) {
                    const idOfWinner = await User
                        .findOne({ username: highestBid.bidder })
                        .exec();
                    console.log(idOfWinner);
                    auction.buyerUserId = idOfWinner;
                }
            }
            await auction.save();
            io.emit("endOfAuction", auction._id);
        });
    });
};

module.exports = setup;
