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
        <button @click="startAuction">Start auction</button>
    </div>
    <div v-if="!auction.buyDate && auction.startDate && !checkIfAuctionIsForUser() && this.$store.getters.id !== '' && auction.type === 'BUY'">
        <button @click="buyNow">Buy now</button>
    </div>
    <div v-if="auction.startDate && auction.type === 'BID'">
        <router-link :to="{ name: 'Bid', params: { auction: auction } }" tag="button" >Go to bids</router-link>
    </div>
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
import router from "../router";
import AuctionModify from "./AuctionModify";

export default {
    name: "Auction",
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
        startAuction () {
            console.log(this.auction);
            axios.get(`${location.origin}/api/startAuction?id=${this.auction._id}`, { withCredentials: true })
                .then((res) => {
                    console.log("ASD");
                    console.log(res.status);
                }
                );
        },
        buyNow () {
            axios.get(`${location.origin}/api/auction/buyNow/${this.auction._id}`, { withCredentials: true });
            axios.get(`${location.origin}/api/auction/${this.auction._id}`, { withCredentials: true })
                .then(res => {
                    console.log(res.data);
                    this.auction = res.data;
                });
        },
        goToBids () {
            console.log("go to bid");
            console.log(this.auction);
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
        },
        bidSockets: function () {
            console.log("listening bids");
            this.socket.on("newBid", (data) => {
                if (data.auctionId === this.auction._id) {
                    console.log(data);
                    this.auction.actualPrice = data.actualPrice;
                }
            });
            this.socket.on("endOfAuction", (auctionId) => {
                if (auctionId === this.auction._id) {
                    this.auction.buyDate = this.auction.endDate;
                };
            });
        }
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
