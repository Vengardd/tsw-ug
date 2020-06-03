const User = require("../model/user");

const addUser = async (username, password) => {
    try {
        return await new User({
            username: username,
            password: password
        }).save();
    } catch (error) {
        console.log(error);
    }
};

const registerUser = async (req, res) => {
    if (!("username" in req.body) || !("password" in req.body)) {
        res.status(400).send({ msg: "Missing username or password." });
    } else {
        res.status(201).json(await addUser(req.body.username, req.body.password));
    }
};
module.exports = {
    addUser,
    registerUser
};
