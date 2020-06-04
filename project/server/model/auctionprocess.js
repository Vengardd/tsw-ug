const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AuctionProcessSchema = new Schema({
    auctionId: { type: mongoose.Schema.Types.ObjectId, ref: "Auction" },
    price: { type: Number, required: true },
    date: { type: Date, required: true },
    bidder: { type: String, required: true }
});

module.exports = mongoose.model("AuctionProcessSchema", AuctionProcessSchema);
