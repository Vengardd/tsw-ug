const mongoose = require("./mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("./passport");
const User = require("./models/user");
const bcrypt = require("./bcrypt/bcrypt");
const auctionController = require("./controller/AuctionController");

const app = express();
const http = require("http").Server(app);
var io = require("socket.io")(http);

const port = process.env.PORT || 5000;

// app.get("/", (req, res) => {
//     res.send("Welcome to my Nodemon API!");
// });

app.listen(port, () => {
    console.log(`Running on port ${port}`);
});

// const router = express.Router();

// const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// const posts = require("./routes/api/posts");

// app.use("/api/posts", posts);

// Middleware

app.get("/", (req, res) => {
    res.send("test");
});

const midAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.status(403).json({
            message: "not authenticated"
        });
    }
};

const rejectMethod = (_req, res, _next) => {
    res.sendStatus(405);
};

app
    .route("/")
    .get(midAuth, (req, res) => {
        res.json({
            isAuthenticated: req.isAuthenticated(),
            user: req.user
        });
    })
    .all(rejectMethod);

app
    .route("/api/login")
    .post(passport.authenticate("local"), async (req, res) => {
        res.status(200).json({
            message: "success"
        });
    })
    .all(rejectMethod);

app
    .route("/api/logout")
    .get((req, res) => {
        req.logout();
        res.redirect("/");
    })
    .all(rejectMethod);

app
    .route("/api/register")
    .post(async (req, res) => {
        try {
            const passwordHash = bcrypt.hash(req.body.password);
            const user = new User({
                username: req.body.username,
                password: passwordHash,
                email: req.body.email
            });
            const doc = await user.save();
            res.json(doc);
        } catch (err) {
            if (!req.body.password) {
                res.status(422).json({
                    password: "Error – password must not be empty!"
                });
            } else {
                res.status(422).json(User.processErrors(err));
            }
        }
    })
    .all(rejectMethod);

// router
//     .route("/api/offer")
//     .get(async (req, res) => {
//         try {
//             var arr = [];
//             for await (const doc of Offer.find()) {
//                 arr.push(doc);
//             }
//             console.log(arr);
//             return res.send(arr);
//         } catch (err) {
//             return res.status(400).json({
//                 error: err.message
//             });
//         }
//     })
//     .post(midAuth, async (req, res) => {
//         try {
//             console.log("Is ok");
//             const user = req.user;
//             const body = req.body;
//             const offer = new Offer({
//                 title: body.title,
//                 description: body.description,
//                 imageUrl: body.imageUrl,
//                 price: body.price,
//                 type: body.type,
//                 owner: {
//                     id: user.id,
//                     username: user.username
//                 },
//                 buyer: null,
//                 duration: body.duration,
//                 isFinisherd: false
//             });
//             console.log(offer.type);
//             console.log(offer.owner.id);
//             console.log("Super");
//             const doc = await offer.save();
//             res.json(doc);
//         } catch (err) {
//             console.log(err);
//             res.status(422).json(Offer.processErrors(err));
//         }
//     })
//     .all(rejectMethod);

app
    .route("/api/user")
    .get(midAuth, (req, res) => {
        if (req.isAuthenticated) {
            res.json({
                user: req.user
            });
        } else {
            res.json({
                user: null
            });
        }
    })
    .all(rejectMethod);

app
    .get("/test", (req, res) => {
        res.json({ test: "test" }).status(200).send();
    })
    .all(rejectMethod);

// app
//     .get("/api/auction/all", (req, res) => {
//         res.json([{ id: 1, title: "firstTitle" }, { id: 2, title: "secondTitle" }]);
//     });
app
    .get("/api/auction/all", auctionController.getAllAuctions);
// app.crea("/api/auction");

io.on("connection", () => {
    console.log("a user is connected");
});

app.get("/messages", (req, res) => {
    io.emit("message", "asd");
    res.sendStatus(200);
});

// module.exports = router;
