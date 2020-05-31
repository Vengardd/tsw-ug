const Auction = require("../models/auction");
const mongoose = require("mongoose");

exports.getAllAuctions = async (req, res) => {
    const allAuctions = await Auction.find();
    res.json(allAuctions);
    return allAuctions;
};

exports.getAuctionById = async (req, res) => {
    const id = req.query.id;
    console.log(id);
    const auction = await Auction.findById(mongoose.Types.ObjectId.createFromHexString(id));
    console.log(auction);
    res.json(auction);
    return auction;
};

exports.addAuction = async (req, res) => {
    try {
        const body = req.body;
        const newAuction = new Auction({
            title: body.title,
            description: body.description,
            startDate: new Date(),
            actualPrice: body.actualPrice
        });
        newAuction.save();
        res.status(201);
    } catch (err) {
        console.log(err);
        res.status(400);
    }
};

exports.actualiseAuction = async (req, res) => {
    try {
        const body = req.body;
        const newAuction = {
            title: body.title,
            description: body.description,
            actualPrice: body.actualPrice
        };
        Auction.findByIdAndUpdate({ _id: body.id }, newAuction, (err, doc) => {
            if (err) {
                res.code(500);
            } else {
                res.json(doc);
            }
        });
        res.status(201);
    } catch (err) {
        console.log(err);
        res.status(400);
    }
};
