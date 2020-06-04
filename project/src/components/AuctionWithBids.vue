<template>
<div class="container">
 <div v-if="auction !== null && auction.startDate && auction.type === 'BID'" class="auction">
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
        <li v-for="bid in bids" :key="bid._id">
            From: {{bid.bidder}} Price: {{bid.price}} <br>
        </li>
            <form v-if="id && id !== auction.sellerUserId && !auction.buyDate" @submit.prevent="makeBid">
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
const io = require("socket.io-client");

export default {
    name: "AuctionWithBids",
    data () {
        return {
            bid: 0,
            bids: [],
            socket: io(`${location.origin}`)
        };
    },
    computed: {
        ...mapGetters(["id", "username"])
    },
    props: ["auction"],
    methods: {
        ...mapActions(["emitMessage"]),
        loadBids: function () {
            console.log("Get messages rest");
            axios.get(`${location.origin}/api/bids` + "?id=" + this.auction._id, { withCredentials: true })
                .then(res => {
                    console.log(res.data);
                    this.bids = res.data;
                }
                )
                .catch(err => {
                    console.log(err);
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
        },
        bidSockets: function () {
            console.log("listening bids");
            this.socket.on("newBid", (data) => {
                console.log("Nowy bid");
                if (data.auctionId === this.auction._id) {
                    this.bids.push(data);
                    console.log(this.bids);
                    this.auction.actualPrice = data.actualPrice;
                }
            });
            this.socket.on("endOfAuction", (auctionId) => {
                if (auctionId === this.auction._id) {
                    this.auction.buyDate = this.auction.endDate;
                };
            });
        }
    },
    mounted () {
        this.bidSockets();
        this.loadBids();
    }
};
</script>

<style lang="scss" scoped>
div{
  .container
  {
      display: flex;
      border: 1px solid red;
      margin-bottom: 15px;
      }
}
</style>
