<template>
  <div class="auction-details">
    Name: {{ auction.name }}<br>
    Seller: {{ auction.seller }}<br>
    <div v-if="auction.type === 'Bid'">
      <div v-if="auction.status === 'OnSale'">
        Current price: ${{ auction.price }}<br>
        <div v-if="auction.duration != null && isAnyTimeLeft">
          Time left: {{ timeLeft }}
        </div>
        <div v-if="auction.highestBidder === ''">
          No one bid yet!<br>
        </div>
        <div v-else>
          Highest bidder: {{ auction.highestBidder }}<br>
        </div>
        <div v-if="isLoggedAndNotSeller">
          <button @click="bidItem()">
            Bid now!
          </button>
          <input v-model="formData.price" id="price-input"
           class="input" type="number"
           min="0.01" step="0.01" placeholder="Your bid"
           size="9" required="">
         </div>
      </div>
      <div v-else-if="auction.status === 'Sold'">
        Sold for: ${{ auction.price }}<br>
        Buyer: {{ auction.highestBidder }}
      </div>
      <div v-else-if="auction.status === 'New'">
        Starting price: ${{ auction.price }}<br>
        Duration: {{ getDurationText }}<br>
        <button id="btn-start" @click="startAuction()">Start auction</button>
      </div>
      <div v-else-if="auction.status === 'Ignored'">
        No buyer<br>
      </div>
    </div>
    <div v-else-if="auction.type === 'Buy'">
      <div v-if="auction.status === 'OnSale'">
        Price: ${{ auction.price }}<br>
        <div v-if="isLoggedAndNotSeller">
          <button @click="buyItem()">
            Buy now!
          </button><br>
        </div>
      </div>
      <div v-else-if="auction.status === 'Sold'">
        Sold for: ${{ auction.price }}<br>
        Buyer: {{ auction.highestBidder }}
      </div>
      <div v-else-if="auction.status === 'New'">
        Price: ${{ auction.price }}<br>
        <button id="btn-start" @click="startAuction()">Start auction</button>
      </div>
    </div>
</div>
</template>

<script>
import axios from "axios";
import router from "../router";
import { mapGetters } from "vuex";
export default {
    name: "AuctionDetails",
    props: ["auction", "currUser", "timeLeft", "socket"],
    data () {
        return {
            formData: {
                id: this.auction._id,
                price: "",
                bidders: [this.currUser.username],
                highestBidder: ""
            }
        };
    },
    computed: {
        ...mapGetters(["currentUser"]),
        isLoggedAndNotSeller: function () {
            const user = this.currUser;
            return user.isAuth && this.auction.seller !== user.username;
        },
        isAnyTimeLeft: function () {
            if (new Date(this.auction.duration).getTime() >= new Date().getTime()) {
                return true;
            }
            return false;
        },
        getDurationText: function () {
            switch (this.auction.duration) {
            case 1000 * 10:
                return "10 Seconds";
            case 1000 * 60 * 60:
                return "1 Hour";
            case 1000 * 60 * 60 * 3:
                return "3 Hours";
            case 1000 * 60 * 60 * 6:
                return "6 Hours";
            case 1000 * 60 * 60 * 12:
                return "12 Hours";
            case 1000 * 60 * 60 * 24:
                return "1 Day";
            case 1000 * 60 * 60 * 24 * 3:
                return "3 Hours";
            case 1000 * 60 * 60 * 24 * 7:
                return "1 Week";
            default:
                return "DEFAULT VALUE";// watch out
            }
        }
    },
    methods: {
        startAuction () {
            axios
                .patch("/api/start", { id: this.auction._id })
                .then(() => {
                    this.socket.emit("startAuction", {
                        id: this.auction._id,
                        username: this.currentUser.username
                    });
                    location.reload();
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        bidItem () {
            if (this.formData.price <= this.auction.price) {
                // show message
                console.log("Your bid is invalid!");
            } else {
                this.formData.highestBidder = this.currUser.username;
                axios
                    .patch("/api/auction", this.formData)
                    .then(() => {
                        console.log("New bid emitted");
                        this.socket.emit("newBid", {
                            id: this.auction._id,
                            bid: this.formData.price
                        });
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        },
        buyItem () {
            const body = {
                id: this.auction._id,
                status: "Sold",
                highestBidder: this.currUser.username
            };
            axios
                .patch("/api/auction", body)
                .then(() => {
                    router.push("/");
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }
};
</script>

<style lang="scss" scoped>
</style>
