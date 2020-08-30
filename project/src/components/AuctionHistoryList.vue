<template>
  <div>
    <h2>Won</h2>
    <ul>
      <li class="auction-list" v-for="auction in wonAuctions" :key="auction._id">
          <Auction :auction="auction"/>
      </li>
    </ul>
    <h2>Participated</h2>
    <ul>
      <li class="auction-list" v-for="auction in participatedAuctions" :key="auction._id">
          <Auction :auction="auction"/>
      </li>
    </ul>
  </div>
</template>

<script>
import Auction from "./Auction";

export default {
    name: "AuctionHistoryList",
    data: function () {
        return {
            wonAuctions: "",
            participatedAuctions: ""
        };
    },
    components: {
        Auction
    },
    async created () {
        this.$store.dispatch("resetAuctions");
        await this.$store.dispatch("loadHistoryAuctions");
        const historyAuctions = this.$store.getters.auctions;
        this.wonAuctions = historyAuctions
            .filter(auction => auction.buyerUserId === this.$store.getters.id);
        this.participatedAuctions = historyAuctions.filter(auction => !this.wonAuctions.includes(auction));
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
