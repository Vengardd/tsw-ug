const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    message: { type: String, required: true },
    date: { type: Date, required: true },
    receiver: { type: String },
    sender: { type: String },
    delivered: { type: Boolean }
});

module.exports = mongoose.model("Message", MessageSchema);
