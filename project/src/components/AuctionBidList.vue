<template>
  <div>
    <ul>
      <li class="auction-list" v-for="auction in auctions" :key="auction._id">
          <Auction :auction="auction"/>
      </li>
    </ul>
  </div>
</template>

<script>
import Auction from "./Auction";

export default {
    name: "AuctionBidList",
    data: function () {
        return {
            auctions: ""
        };
    },
    components: {
        Auction
    },
    async created () {
        this.$store.dispatch("resetAuctions");
        await this.$store.dispatch("loadAllBidAuctions");
        this.auctions = this.$store.getters.auctions;
    }
};
</script>

<style lang="scss" scoped>
div{
  ul{
    display: flex;
    flex-wrap:wrap;
   list-style: none;
  }
  li{
    margin-left: 20px;
  }
  }
</style>
