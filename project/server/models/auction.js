const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AuctionSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    startDate: { type: Date, required: true },
    buyDate: { type: Date },
    endDate: { type: Date, required: true },
    type: { type: String, enum: ["BUY", "BID"] },
    duration: { type: Number },
    sellerUserId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    buyerUserId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    actualPrice: { type: Number, required: true }
});

const Auction = mongoose.model("Auction", AuctionSchema);

// Export the model
module.exports = Auction;
