const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AuctionSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    startDate: { type: Date },
    buyDate: { type: Date },
    endDate: { type: Date },
    type: { type: String, enum: ["BUY", "BID"] },
    duration: { type: Number },
    sellerUserId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    buyerUserId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    actualPrice: { type: Number }
});

const Auction = mongoose.model("Auction", AuctionSchema);

module.exports = Auction;
