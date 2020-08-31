/* eslint-disable eqeqeq */
const Auction = require("../model/auction");
const User = require("../model/user");
const AuctionProcess = require("../model/auctionprocess");
const mongoose = require("mongoose");

const limitAuctionOnPage = 10;

exports.getAllAuctions = async (req, res) => {
    const page = req.query.page;
    const allAuctions = await Auction.find({ startDate: { $exists: true, $ne: null } }).limit(limitAuctionOnPage).skip((page - 1) * limitAuctionOnPage);
    res.send(allAuctions);
    return allAuctions;
};

exports.getAuction = async (req, res) => {
    console.log("get auction by id");
    const id = req.params.id;
    const auction = await Auction.findOne({ _id: id });
    res.send(auction);
    return auction;
};

exports.getAllUserAuctions = async (req, res) => {
    const id = req.user.id;
    const allAuctions = await Auction.find({ sellerUserId: id });
    console.log(allAuctions);
    res.send(allAuctions);
};

exports.getAllHistoryAuctions = async (req, res) => {
    const id = req.user.id;
    const participatedAuctionIds = await AuctionProcess.find({ bidder: req.user.username })
        .distinct("auctionId");

    const participatedAuctions = await Auction.find({
        endDate: {
            $lt: new Date()
        },
        _id: {
            $in: participatedAuctionIds
        }

    }).exec();

    const wonAuctions = await Auction.find({
        buyerUserId: id
    }).exec();

    const result = new Set(wonAuctions);
    participatedAuctions.forEach(a => result.add(a));
    console.log(result);
    res.send(Array.from(result));
};

exports.getCurrentBiddedAuctions = async (req, res) => {
    const auctionIdsFromBids = await AuctionProcess.find({ bidder: req.user.username })
        .distinct("auctionId");
    if (auctionIdsFromBids) {
        const auctions = await Auction.find({
            endDate: {
                $gt: new Date()
            },
            _id: {
                $in: auctionIdsFromBids
            }
        })
            .exec();
        console.log(auctions);
        res.send(auctions);
    }
    res.status(200);
};

exports.addOrUpdateAuction = async (req, res) => {
    console.log("WCHODZI TU");
    const auction = req.body;
    if (auction.isBuyNow) {
        auction.type = "BUY";
    } else {
        auction.type = "BID";
    }
    delete auction.isBuyNow;
    if (req.user.id === auction.sellerUserId !== undefined) {
        res.status(400);
    }
    if (auction._id !== undefined) {
        if (auction.startDate) {
            res.send(400);
        }
        console.log("actualise");
        await Auction.updateOne({ _id: auction._id }, { $set: auction });
        res.status(201).send(auction);
        return auction;
    }
    console.log("new");
    auction.sellerUserId = req.user.id;
    const newAuction = new Auction(auction);
    newAuction.save();
    res.status(201).send(newAuction);
};

exports.startAuction = async (req, res) => {
    const id = req.query.id;
    // const auction = await Auction.findOne({ _id: id });
    const newStartDate = new Date();
    const newEndDate = new Date(newStartDate.getTime() + 909090909 * 1000);
    // newEndDate.setTime(newStartDate.getTime() + (auction.duration * 60 * 1000));
    console.log(newStartDate);
    const newFields = {
        startDate: newStartDate,
        endDate: newEndDate
    };
    const newAuction = await Auction.findOneAndUpdate({ _id: id }, newFields, { new: true });
    console.log(newAuction);
    return res.json(newAuction);
};

exports.buyNow = async (req, res) => {
    const id = req.user.id;
    const auctionId = req.params.id;
    const oldAuction = await Auction.findOne({ _id: auctionId });
    if (id === oldAuction.sellerUserId) {
        res.status(400).end();
    }
    const newFields = {
        buyDate: new Date(),
        buyerUserId: id
    };
    const actualisedAuction = await Auction.findOneAndUpdate({ _id: auctionId }, newFields, { new: true });
    res.status(200).send(actualisedAuction);
};

exports.getBids = async (req, res) => {
    const auctionId = req.query.id;
    console.log(auctionId);
    const bids = await AuctionProcess.find({ auctionId: auctionId });
    res.send(bids);
    return bids;
};

exports.endAuction = async (req, res) => {
    const auctionId = req.params.id;
    const bids = await AuctionProcess.find({ auctionId: auctionId }).sort((a, b) => a.price - b.price);
    if (bids === []) {
        await Auction.update({ _id: auctionId }, { buyDate: new Date() });
    } else {
        const buyerName = bids[0];
        const buyer = await User.find({ username: buyerName });
        await Auction.update({ _id: auctionId }, { buyerUserId: buyer._id, buyDate: new Date() });
    }
};
