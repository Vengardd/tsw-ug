const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("./passport");
const User = require("./models/user");
const auctionController = require("./controller/AuctionController");
const messageController = require("./controller/MessageController");
const AuctionProcessController = require("./controller/AuctionProcessController");
const userController = require("./controller/UserController");
const axios = require("axios");
const mongoose = require("mongoose");
const mongos = require("./mongoose");
const expressSesion = require("express-session");
const MongoStore = require("connect-mongo")(expressSesion);
const passportSocketIo = require("passport.socketio");
const cookieParser = require("cookie-parser");

// https.createServer(options, function (req, res) {
//     res.writeHead(200);
//     res.end("hello world\n");
// }).listen(5000);

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ credentials: true, origin: "http://localhost:8080" }));
const port = 5000;

// const server = require("./https")(app);

// server.listen(port, () => {
//     console.log("https");
// });
const store = new MongoStore({
    mongooseConnection: mongoose.connection
});

app.use(expressSesion({
    key: "connect.sid",
    secret: "SECRET",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true },
    store: store
}));

app.use(passport.initialize());
app.use(passport.session());

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

app
    .get("/api/message/all", messageController.getAllMessagesByClientUsername);
app
    .get("/api/auction", auctionController.getAuctionById);

app
    .get("/", (req, res) => {
        res.send("test");
    });

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
    })
    .all(rejectMethod);

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
                password: req.body.password,
                name: req.body.name,
                surname: req.body.surname,
                email: req.body.email
            });
            const doc = await user.save();
            res.status(201).json(doc);
        } catch (err) {
            res.status(422);
        }
    })
    .all(rejectMethod);

app
    .post("/start", isAuth, auctionController.startAuction)
    .all(rejectMethod);

app
    .get("/auction", auctionController.getAuctionById)
    .post("/auction", isAuth, auctionController.addAuction)
    .patch("/auction", isAuth, auctionController.actualiseAuction)
    .delete("/auction", isAuth, auctionController.deleteAuction)
    .all(rejectMethod);

app
    .get("/auctions", auctionController.getAllAuctions)
    .all(rejectMethod);

app
    .get("/bids", isAuth, AuctionProcessController.getAuctionProcessesForUser)
    .all(rejectMethod);

// app
//     .get("/history", isAuth, messageController.getHistoryForUser)
//     .all(rejectMethod);

io.use(
    passportSocketIo.authorize({
        key: "connect.sid",
        secret: "SECRET",
        store: store,
        passport: passport,
        cookieParser: cookieParser
    })
);

io.on("connection", socket => {
    console.log(`Made socket connection: ${socket.id}`);
    const username = socket.request.user.username;
    socket.on("join-auction", data => {
        if (socket.request.user.logged_in) {
            console.log(
                `Socket: User { ${username} } is joining { ${socket.id} }`
            );
            socket.join(data.id);
        }
    });
    socket.on("start-auction", data => {
        if (socket.request.user.logged_in) {
            console.log(`New auction socket created, id: { ${data.id} }`);
        }
    });
    socket.on("leave-auction", data => {
        if (socket.request.user.logged_in) {
            console.log(
                `Socket: User { ${username} } is leaving { ${socket.id} }`
            );
            socket.leave(data.socketId);
        }
    });
    socket.on("new-bid", data => {
        if (socket.request.user.logged_in) {
            console.log(`Socket: New bid from user { ${username} }`);
            const renamedData = {
                bid: data.bid,
                bidder: username
            };
            io.sockets.in(data.id).emit("new-bid", renamedData);
        }
    });
});

app.listen(port, () => {
    console.log(`Running on port ${port}`);
});
