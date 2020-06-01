const Auction = require("../models/auction");
const AuctionProcess = require("../models/auctionProcess");
const mongoose = require("mongoose");

const limitAuctionOnPage = 20;

const processErrors = (err) => {
    const msg = {};
    for (const key in err.errors) {
        msg[key] = err.errors[key].message;
    }
    return msg;
};

exports.getAllAuctions = async (req, res) => {
    const page = req.query.page;
    const allAuctions = await Auction.find().limit(limitAuctionOnPage).skip((page - 1) * limitAuctionOnPage);
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

exports.deleteAuction = async (req, res) => {
    const id = req.query.id;
    const auction = await Auction.findByIdAndDelete(mongoose.Types.ObjectId.createFromHexString(id));
    res.json(auction);
    return auction;
};

async function hello (auctionId, doc) {
    const lastAuctionProcess = await AuctionProcess.findOne({ auctionId: auctionId }).sort({ price: -1 });
    doc.buyerUserId = lastAuctionProcess.bidderId;
    doc.actualPrice = lastAuctionProcess.price;
};

exports.startAuction = async (req, res) => {
    const idFiltr = { _id: req.body.auctionId };
    Auction.findOne(idFiltr, async (err, doc) => {
        if (err) {
            res.status(500).json(processErrors(err));
        } else if (doc.sellerUserId === req.user._id &&
                   doc.startAuction != null) {
            doc.startDate = new Date();
            if (doc.type === "BID") {
                setTimeout(() => {
                    const lastAuctionProcess = AuctionProcess.findOne({ auctionId: doc._id }).sort({ price: -1 });
                    doc.buyerUserId = lastAuctionProcess.bidderId;
                    doc.actualPrice = lastAuctionProcess.price;
                    doc.save();
                }, doc.duration);
            } else {
                doc.startAuction = new Date();
                doc.save();
                res.json(doc);
            }
        }
    });
};

exports.getHistoryForUser = async (req, res) => {
    try {
        const userId = req.user._id;
        const set = new Set();
        set.add(await AuctionProcess.find({ bidderId: userId }));
        set.add(await Auction.find({
            $or: [{
                sellerUserId: userId
            }, { buyerUserId: userId }]
        }));
        return res.json(set);
    } catch (err) {
        console.log(err);
        res.status(422).json(processErrors(err));
    }
};
