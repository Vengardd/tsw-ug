const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("./passport");
const User = require("./models/user");
const Message = require("./models/message");
const bcrypt = require("./bcrypt/bcrypt");
const auctionController = require("./controller/AuctionController");
const messageController = require("./controller/MessageController");
const userController = require("./controller/UserController");
const axios = require("axios");
const mongoose = require("mongoose");
const mongos = require("./mongoose");

// https.createServer(options, function (req, res) {
//     res.writeHead(200);
//     res.end("hello world\n");
// }).listen(5000);

const app = express();
app.use(bodyParser.json());
app.use(cors({ credentials: true, origin: "http://localhost:8080" }));
// const server = require("./https")(app);
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Running on port ${port}`);
});

// server.listen(port, () => {
//     console.log("https");
// });

app.use(passport.initialize());

const http = require("http").Server(app);
var io = require("socket.io")(http, { origins: "*:*" });
io.set("origins", "localhost:8080");

const axiosConfig = {
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:8080/",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
    }
};

axios.config = axiosConfig;

// app.get("/", (req, res) => {
//     res.send("Welcome to my Nodemon API!");
// });

// const routes = require("./routes/AuctionRouter");
// app.use("/api", routes);

app
    .get("/", (req, res) => {
        res.send("test");
    });
app
    .get("/api/message/all", messageController.getAllMessagesByClientUsername);
app.get("/api/auction", auctionController.getAuctionById);

const users = [];
let messages = [];

const ChatSchema = mongoose.Schema({
    username: String,
    msg: String
});

const ChatModel = mongoose.model("chat", ChatSchema);

ChatModel.find((err, result) => {
    if (err) throw err;

    messages = result;
});

io.on("connection", socket => {
    socket.on("example", function (data) {
        io.emit("example", data);
    });

    socket.emit("loggedIn", {
        users: users.map(s => s.username),
        messages: messages
    });

    socket.on("newuser", username => {
        console.log(`${username} has arrived at the party.`);
        socket.username = username;

        users.push(socket);

        io.emit("userOnline", socket.username);
    });

    socket.on("msg", msg => {
        const message = new ChatModel({
            username: socket.username,
            msg: msg
        });

        message.save((err, result) => {
            if (err) throw err;

            messages.push(result);

            io.emit("msg", result);
        });
    });

    // Disconnect
    socket.on("disconnect", () => {
        console.log(`${socket.username} has left the party.`);
        io.emit("userLeft", socket.username);
        users.splice(users.indexOf(socket), 1);
    });
});
