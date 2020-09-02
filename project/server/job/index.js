const cron = require("node-cron");
const Auction = require("../model/auction");

const setup = (io) => {
    cron.schedule("* * * * * *", async () => {
        console.log("job is running");
        const allAuctions = await Auction.find({
            endDate: {
                $lt: new Date()
            },
            buyDate: {
                $eq: null
            }
        });
        allAuctions.forEach(auction => {
            auction.buyDate = auction.endDate;
            auction.save();
            console.log(auction._id);
            io.emit("endOfAuction", auction._id);
        });
    });
};

module.exports = setup;
