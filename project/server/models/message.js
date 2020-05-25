const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    message: { type: String, required: true },
    date: { type: Date, required: true },
    receiverUserId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    senderUserId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

// Export the model
module.exports = mongoose.model("Message", MessageSchema);
