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
    const username = req.body.username;
    const password = req.body.password;
    if (!username || !password) {
        return res.status(400).send({ msg: "Missing username or password." });
    }
    const userExists = await User.findOne({ username: username }).exec();
    if (userExists) {
        return res.status(400).send({ msg: "User already exists." });
    }
    return res.status(201).json(await addUser(req.body.username, req.body.password));
};
module.exports = {
    addUser,
    registerUser
};
