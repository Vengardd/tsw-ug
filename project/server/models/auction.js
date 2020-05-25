const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let AuctionSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String},
    startDate: {type: Date, required: true},
    buyDate: {type:Date},
    endDate: {type: Date, required: true},
    sellerUserId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    buyerUserId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    actualPrice: {type: Number, required: true}
});

//Export the model
module.exports = mongoose.model('Auction', AuctionSchema);