<template>
  <div>
    <ul>
      <li class="auction-list" v-for="auction in auctions" :key="auction._id">
          <Auction :auction="auction" :currUser="currUser"/>
      </li>
    </ul>
  </div>
</template>

<script>
import Auction from "@/components/Auction";

export default {
    name: "AuctionList",
    components: {
        Auction
    },
    props: ["auctions"],
    data () {
        return {
            currUser: this.$store.getters.currentUser
        };
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
