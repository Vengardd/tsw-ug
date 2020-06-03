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
  </div>
</div>
</template>

<script>
export default {
    name: "Auction",
    props: ["auction"]
};
</script>

<style lang="scss" scoped>
div{
  .container
  {
      display: flex;
      border: 1px solid red;
      }
}
</style>
