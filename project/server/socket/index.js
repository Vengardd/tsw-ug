const Message = require("../model/message");
const Bid = require("../model/auctionprocess");
const Auction = require("../model/auction");
const User = require("../model/user");
const AuctionProcess = require("../model/auctionprocess");

const connectedClients = {};

const setup = (socketIo) => {
    socketIo.on("connection", clientSocket => {
        connectedClients[clientSocket.request.user.username] = clientSocket;
        checkForMessages(clientSocket.request.user.username, clientSocket);
        clientSocket.on("bid", async data => {
            console.log("BID");
            const auction = await Auction.findById({ _id: data.auctionId });
            if (auction.endDate > new Date()) {
                const newBid = new Bid(data);
                await newBid.save();
                await Auction.updateOne({ _id: data.auctionId }, { $set: { actualPrice: newBid.price } });
                clientSocket.broadcast.emit("newBid", newBid);
            } else {
                const bids = await AuctionProcess.find({ auctionId: auction._id })
                    .sort("price");
                const buyerName = bids[0].bidder;
                const buyer = await User.find({ username: buyerName });
                await Auction.update({ _id: auction._id }, { buyerUserId: buyer._id, buyDate: new Date() });
                clientSocket.broadcast.emit("endOfAuction", auction._id);
            }
        });

        clientSocket.on("message", data => {
            checkForMessages(clientSocket.request.user.username, clientSocket);
        });

        clientSocket.on("sendMessage", data => {
            console.log(data.receiver);
            console.log(clientSocket.request.user);
            console.log();
            const receiver = connectedClients[data.receiver];
            if (receiver) {
                console.log("isExistingReceiver");
                const newMessage = new Message({
                    message: data.message,
                    date: new Date(),
                    receiver: data.receiver,
                    sender: clientSocket.request.user.username,
                    delivered: true
                });
                newMessage.save();
                clientSocket.broadcast.emit("message", {
                    _id: newMessage._id,
                    message: data.message,
                    receiver: data.receiver,
                    sender: clientSocket.request.user.username
                });
            } else {
                console.log("receiverNotExisting");
                console.log(data);
                const newMessage = new Message({
                    message: data.message,
                    date: new Date(),
                    receiver: data.receiver,
                    sender: clientSocket.request.user.username,
                    delivered: false
                });
                newMessage.save();
                clientSocket.broadcast.emit("message", {
                    _id: newMessage._id,
                    message: data.message,
                    receiver: data.receiver,
                    sender: clientSocket.request.user.username
                });
            }
        });
        clientSocket.on("disconnect", () => {
            delete connectedClients[clientSocket.request.user.username];
        });
    });
};

const checkForMessages = (username, clientSocket) => {
    const filter = { receiver: username, delivered: false };
    Message.where({ recipient: username }).exec()
        .then(pendingMessages => {
            if (pendingMessages.length === 0) return;

            pendingMessages.forEach(pendingMessage => clientSocket.emit("message", {
                _id: pendingMessage._id,
                message: pendingMessage.message,
                receiver: pendingMessage.receiver,
                sender: pendingMessage.sender
            }));
        });
    Message.updateMany(filter, { delivered: true });
};

module.exports = setup;
