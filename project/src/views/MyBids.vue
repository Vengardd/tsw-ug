<template>
  <div class="my-bids">
    <h2>My bids</h2>
    <AuctionList v-bind:auctions="auctions"/>
  </div>
</template>

<script>
import axios from "axios";
import AuctionList from "@/components/AuctionList";

export default {
    name: "MyBids",
    components: {
        AuctionList
    },
    data () {
        return {
            auctions: null
        };
    },
    created () { // or beforecreated
        axios
            .get("/api/my-bids")
            .then((resp) => {
                this.auctions = resp.data;
            })
            .catch((err) => {
                console.log(err);
            });
    }
};
</script>
