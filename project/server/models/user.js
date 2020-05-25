const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    username: {type: String, required: true, max: 12},
    name: {type: String},
    surname: {type: String},
    email: {type:String}
});

//Export the model
module.exports = mongoose.model('User', UserSchema);