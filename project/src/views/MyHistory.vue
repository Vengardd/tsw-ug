<template>
  <div class="my-history">
    <h2>My history</h2>
    <AuctionList v-bind:auctions="auctions"/>
  </div>
</template>

<script>
import axios from "axios";
import AuctionList from "@/components/AuctionList";

export default {
    name: "MyHistory",
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
            .get("/api/my-history")
            .then((resp) => {
                this.auctions = resp.data;
            })
            .catch((err) => {
                console.log(err);
            });
    }
};
</script>
