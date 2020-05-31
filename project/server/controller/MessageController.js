const Message = require("../models/message");

exports.getAllMessagesByClientUsername = async (req, res) => {
    const allMessages = await Message.find();
    console.log(allMessages);
    res.json(allMessages);
    return allMessages;
};
