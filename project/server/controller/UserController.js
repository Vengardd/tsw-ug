const User = require("../models/user");

exports.getAllUsers = async (req, res) => {
    const allUsers = await User.find();
    res.json(allUsers);
    return allUsers;
};

exports.getUsernameById = async (id) => {
    const user = await User.findById(id);
    return user;
};
