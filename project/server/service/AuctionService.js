/* eslint-disable eqeqeq */
const Auction = require("../model/auction");
const User = require("../model/user");
const AuctionProcess = require("../model/auctionprocess");
const mongoose = require("mongoose");

const limitAuctionOnPage = 12;

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

exports.getAllAuctionsByUser = async (req, res) => {
    const id = req.user.id;
    const allAuctions = await Auction.find();
    const auctionsFromBids = await AuctionProcess.find({ bidder: req.user.username }).map(bid => bid.auctionId);
    const allAuctionsByUser = await allAuctions
        .filter(auction => {
            if (auctionsFromBids) {
                if (auctionsFromBids.includes(auction._id.toString())) {
                    return true;
                }
            }
            if (auction.sellerUserId.toString() == id) {
                return true;
            }
            if (auction.buyerUserId) {
                if (auction.buyerUserId.toString() == id) {
                    return true;
                }
            }
            return false;
        });
    res.send(allAuctionsByUser);
    return allAuctionsByUser;
};

exports.getAllAuctionsOwnBids = async (req, res) => {
    const auctionsFromBids = await AuctionProcess.find({ bidder: req.user.username }).map(bid => bid.auctionId);
    if (auctionsFromBids) {
        const auctions = await (await Auction.find({})).filter(auction => auctionsFromBids.includes(auction._id));
        res.send(auctions);
    }
};

exports.addOrUpdateAuction = async (req, res) => {
    const auction = req.body;
    if (auction.isBuyNow) {
        auction.type = "BUY";
    } else {
        auction.type = "BID";
    }
    delete auction.isBuyNow;
    if (req.user._id === auction.sellerUserId) {
        if (auction._id !== undefined) {
            console.log("actualise");
            await Auction.updateOne({ _id: auction._id }, { $set: auction });
            res.status(201);
            return auction;
        } else {
            console.log("new");
            auction.sellerUserId = req.user.id;
            const newAuction = new Auction(auction);
            newAuction.save();
            res.status(201);
            return newAuction;
        }
    }
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
    const newFields = {
        buyDate: new Date(),
        buyerUserId: id
    };
    return await Auction.findOneAndUpdate({ _id: auctionId }, newFields);
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
