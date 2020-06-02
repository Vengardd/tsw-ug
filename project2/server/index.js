const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("./mongoose");
const userController = require("./controller/UserController");

const app = express();
app.use(bodyParser());
app.use(cors());

app.use("/api", userController);

app.get("/", function (req, res) {
    res.send("Hello World!");
});

app.listen(5000, () => {
    console.log("Example app listening on port 5000!");
});
