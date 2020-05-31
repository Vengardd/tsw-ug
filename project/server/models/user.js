const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { type: String, required: true, max: 12 },
    password: { type: String, required: true },
    name: { type: String },
    surname: { type: String },
    email: { type: String }
});

// Export the model
module.exports = mongoose.model("User", UserSchema);
