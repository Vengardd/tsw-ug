const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let AuctionProcessSchema = new Schema({
    auctionId: {type: mongoose.Schema.Types.ObjectId, ref: 'Auction'},
    price: {type: Number, required: true},
    date: {type: Date, required: true},
    bidderId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

//Export the model
module.exports = mongoose.model('Message', MessageSchema);