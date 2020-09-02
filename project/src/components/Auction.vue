<template>
<div class="container">
 <div v-if="auction !== null" class="auction">
    <h3> {{ auction.title }} </h3>
    <div v-if="auction.type === 'BID'">
      <h4>Bid Auction</h4>
    </div>
    <div v-if="auction.type === 'BUY'">
      <h4>Buy-Now Auction</h4>
    </div>
    <div>
        Description: {{auction.description}} <br>
        Start Date: {{auction.startDate}} <br>
        End Date: {{auction.endDate}} <br>
        Buy Date: {{auction.buyDate}} <br>
        Duration: {{auction.duration}} <br>
        Actual Price: {{auction.actualPrice}} <br>
    </div>
    <div v-if="!auction.startDate && checkIfAuctionIsForUser()">
        <AuctionModify :oldAuction="auction"/>
    </div>
    <div v-if="!auction.startDate && checkIfAuctionIsForUser()">
        <form @submit.prevent="modifyAuction" ref="form">
            <label> title  </label>
            <input v-model="newAuction.title" type="text" name="title" id="title" minLength="3" required="" /> <br>
            <label> description  </label>
            <input v-model="newAuction.description" type="text" name="description" id="description" minLength="3" required="" /> <br>
            <label> duration  </label>
            <input v-model="newAuction.duration" type="number" name="duration" id="duration" required="" /> <br>
            <label> actual price  </label>
            <input v-model="newAuction.actualPrice" type="number" name="actualPrice" id="actualPrice" required="" /> <br>
            <label> is buy now  </label>
            <input v-model="newAuction.isBuyNow" type="checkbox" name="isBuyNow" id="isBuyNow" /> <br>
            <button type="submit">Apply changes</button>
        </form>
    </div>
    <div v-if="!auction.startDate && checkIfAuctionIsForUser()">
        <button @click="startAuction">Start auction</button>
    </div>
    <div v-if="!auction.buyDate && auction.startDate && !checkIfAuctionIsForUser() && this.$store.getters.id !== '' && auction.type === 'BUY'">
        <button @click="buyNow">Buy now</button>
    </div>
    <div v-if="auction.startDate && auction.type === 'BID'">
        <router-link :to="{ name: 'Bid', params: { auction: auction } }" tag="button" >Go to bids</router-link>
    </div>
    <form v-if="id && id !== auction.sellerUserId && !auction.buyDate && auction.type === 'BID'" @submit.prevent="makeBid">
            <label>Bid: </label>
           <input v-model="bid" name="bid" type="text">
        <button type="submit">Bid</button>
    </form>
  </div>
</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import axios from "axios";
import router from "../router";
import AuctionModify from "./AuctionModify";
const io = require("socket.io-client");

export default {
    name: "Auction",
    data () {
        return {
            bid: this.auction.actualPrice + 1,
            socket: io(`${location.origin}`),
            newAuction: {
                title: "",
                description: "",
                duration: 0,
                actualPrice: 0,
                isBuyNow: ""
            }
        };
    },
    components: {
        AuctionModify
    },
    computed: {
        ...mapGetters(["id", "username"])
    },
    props: ["auction"],
    methods: {
        ...mapActions(["emitMessage"]),
        checkIfAuctionIsForUser () {
            return this.auction.sellerUserId === this.$store.getters.id;
        },
        modifyAuction: function () {
            axios.post(`${location.origin}/api/auction/addOrUpdate`, this.newAuction, { withCredentials: true })
                .then((res) => {
                    this.$set(this, "auction", res.data);
                    console.log(res);
                }
                );
        },
        startAuction () {
            axios.get(`${location.origin}/api/startAuction?id=${this.auction._id}`, { withCredentials: true })
                .then(res => {
                    this.$set(this, "auction", res.data);
                    console.log(this.auction);
                    console.log(res.data);
                });
        },
        buyNow () {
            axios.get(`${location.origin}/api/auction/buyNow/${this.auction._id}`, { withCredentials: true })
                .then(res => {
                    this.$set(this, "auction", res.data);
                });
        },
        goToBids () {
            router.push({
                name: "Bid",
                props: {
                    query: this.auction
                }
            });
        },
        makeBid () {
            if (this.bid > this.auction.actualPrice) {
                this.emitMessage({
                    eventName: "bid",
                    data: {
                        auctionId: this.auction._id,
                        price: this.bid,
                        date: new Date(),
                        bidder: this.username
                    }
                });
            }
        }
    },
    created () {
        this.socket.on("newBid", (data) => {
            if (data.auctionId === this.auction._id) {
                this.auction.actualPrice = data.price;
            }
        });
        this.socket.on("endOfAuction", (auctionId) => {
            if (auctionId === this.auction._id) {
                this.$set(this.auction, "buyDate", this.auction.endDate);
                this.auction.buyDate = this.auction.endDate;
            };
        });
        this.newAuction._id = this.auction._id;
        this.newAuction.title = this.auction.title;
        this.newAuction.description = this.auction.description;
        this.newAuction.duration = this.auction.duration;
        this.newAuction.actualPrice = this.auction.actualPrice;
        this.newAuction.isBuyNow = this.auction.isBuyNow;
        this.newAuction.sellerUserId = this.auction.sellerUserId;
    }
};
</script>

<style lang="scss" scoped>
div{
  .container
  {
      display: flex;
        justify-content:center;
    }
}
</style>
