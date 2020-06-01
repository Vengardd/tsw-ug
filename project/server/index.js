const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("./passport");
const User = require("./models/user");
const Message = require("./models/message");
const auctionController = require("./controller/AuctionController");
const messageController = require("./controller/MessageController");
const userController = require("./controller/UserController");
const axios = require("axios");
const mongoose = require("mongoose");
const mongos = require("./mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const passportSocketIo = require("passport.socketio");
const cookieParser = require("cookie-parser");

// https.createServer(options, function (req, res) {
//     res.writeHead(200);
//     res.end("hello world\n");
// }).listen(5000);

const app = express();
app.use(bodyParser.json());
app.use(cookieParser);
app.use(cors({ credentials: true, origin: "http://localhost:8080" }));
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Running on port ${port}`);
});

// const server = require("./https")(app);

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
app.use(cookieParser());

const sessionStore = new MongoStore({
    mongooseConnection: mongoose.connection
});

app.use(session({
    secret: "SECRET",
    store: sessionStore
}));

app
    .get("/", (req, res) => {
        res.send("test");
    });
app
    .get("/api/message/all", messageController.getAllMessagesByClientUsername);
app
    .get("/api/auction", auctionController.getAuctionById);

const isAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(403);
};

const rejectMethod = (_req, res, _next) => {
    res.sendStatus(405);
};

app
    .get("/users", passport.authenticate("basic", {
        session: false
    }), (req, res) => {
        User.find({}, (err, data) => {
            if (err) {
                res.status(500).send();
            } else {
                res.json(data);
            }
        });
    })
    .all(rejectMethod);

app
    .get("/currentUser", (req, res) => {
        if (req.isAuthenticated()) {
            res.send({
                username: req.user.username,
                isAuth: req.isAuthenticated()
            });
        } else {
            res.send({
                message: "Not logged in"
            });
        }
    });

app
    .post("/login", passport.authenticate("local"), async (req, res) => {
        await res.json({
            message: "success"
        });
    })
    .all(rejectMethod);

app
    .get("/logout", isAuth, (req, res) => {
        req.logout();
        res.status(200).json({
            isAuth: req.isAuthenticated()
        });
    })
    .all(rejectMethod);

app
    .post("/register", async (req, res) => {
        try {
            const user = new User({
                username: req.body.username,
                password: req.body.password
            });
            const doc = await user.save();
            res.json(doc);
        } catch (err) {
            res.status(422);
        }
    })
    .all(rejectMethod);

io.use(passportSocketIo.authorize({
    cookieParser: cookieParser, // the same middleware you registrer in express
    key: "express.sid", // the name of the cookie where express/connect stores its session_id
    secret: "SECRET", // the session_secret to parse the cookie
    store: sessionStore // we NEED to use a sessionstore. no memorystore please
    // success: onAuthorizeSuccess, // *optional* callback on success - read more below
    // fail: onAuthorizeFail // *optional* callback on fail/error - read more below
}));

io.on("connection", (socket) => {
    socket.on("joinAuction", (data) => {
    });
    socket.on("startAuction", (data) => {
    });
    socket.on("leaveAuction", (data) => {
    });
    socket.on("newBid", (data) => {
    });
    socket.on("messages", (data) => {
    });
});
