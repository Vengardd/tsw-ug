const express = require("express");
var app = express();
const auctionController = require("../controller/AuctionController");

app.get("/api/auction/all", auctionController.getAllAuctions);
