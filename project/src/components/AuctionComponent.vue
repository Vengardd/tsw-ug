<template>
  <div class="container">
    <h1>Latest Auctions</h1>
    <p> AuctionComponent </p>
    <div class="auctions-container">
      <div class="post"
        v-for="auction in auctions"
        :key="auction.id"
      >
        <p class="text">{{ auction.id }}</p>
        <p class="text">{{ auction.title }}</p>
       </div>
    </div>
    <p> </p>
  </div>
</template>

<script>

import AuctionService from "../service/AuctionService";

export default {
    name: "AuctionComponent",
    data () {
        return {
            auctions: [],
            error: "",
            text: ""
        };
    },
    async created () {
        try {
            this.auctions = await AuctionService.getAllAuctions();
        } catch (err) {
            this.error = err.message;
        }
    }
};

</script>
