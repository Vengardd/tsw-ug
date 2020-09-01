require("dotenv").config();
const path = require("path");
const serveStatic = require("serve-static");
const userController = require("./controller/UserController");
const auctionController = require("./controller/AuctionController");
const messageController = require("./controller/MessageController");
const auctionRestController = require("./rest/AuctionRestController");
const mongus = require("./mongoose");
const express = require("express");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const MongoStore = require("connect-mongo")(expressSession);
const mongoose = require("mongoose");
const passport = require("passport");
const cors = require("cors");

const mongoStore = new MongoStore({ mongooseConnection: mongoose.connection });

const app = express();

app.use(cors({ credentials: true, origin: "http://localhost:5001" }));

app.use(express.json());
app.use(cookieParser());
app.set("trust proxy", 1);
app.use(expressSession({
    secret: "SECRET",
    resave: false,
    saveUninitialized: true,
    store: mongoStore,
    cookie: { secure: false }
}));
app.use(express.urlencoded({ extended: false }));

app.use(passport.initialize());
app.use(passport.session());

// app.use(serveStatic(path.join(__dirname, "./public")));

// app.get(/.*/, (req, res) => res.sendFile(path.join(__dirname, "/public/index.html")));

app.use("/api", userController);
app.use("/api", auctionController);
app.use("/api", messageController);

app.use("/rest/api", auctionRestController);

app.get("/", function (req, res) {
    res.send("Hello World!");
});

const httpPort = process.env.PORT || 5000;
const httpsPort = process.env.PORT || 443;
console.log(httpsPort);
const server = app.listen(httpPort);
// const server = require("./https")(app).listen(httpsPort);

const passportSocketIo = require("passport.socketio");
const io = require("socket.io")(server);
// io.use(passportSocketIo.authorize({
//     key: "connect.sid",
//     secret: "SECRET",
//     store: mongoStore,
//     passport: passport,
//     cookieParser: cookieParser
// }));

require("./socket")(io);

const bidRestController = require("./rest/BidRestController")(io);
app.use("/rest/api", bidRestController);

// var routes = require("./rest/BidTestRestController");
// routes(app, io);

app.use((req, res) => {
    res.status(404).json({
        error: `URL NOT FOUNND: ${req.method} ${req.originalUrl}`
    });
});
