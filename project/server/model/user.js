const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { type: String, required: true, max: 25 },
    password: { type: String, required: true }
});

// Export the model
module.exports = mongoose.model("User", UserSchema);
