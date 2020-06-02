<template>
  <div class="auction-edit">
    <br>
    <form @submit.prevent="updateAuction()">
      <label for="name-input">Name: </label>
      <input v-model="formData.name" id="name-input" class="input" type="text"
       minLength="3" placeholder="Name" required="">
      <br><br>
      <label for="price-input">Price: $ </label>
      <input v-model="formData.price" id="price-input" class="input" type="number"
       min="0.01" step="0.01" placeholder="Price"
       size="9" required="">
      <br><br>
      <div class="select-type">
        <label for="type-input">Type: </label>
        <select v-model="formData.type" id="type-input">
          <option value="Bid">Bid</option>
          <option value="Buy">Buy now</option>
        </select>
        <br><br>
      </div>
      <div v-if="formData.type === 'Bid'">
        <label for="duration-input">Duration: </label>
        <select v-model="formData.duration" id="type-input">
          <option v-for="option in options" :key="option.text"
          v-bind:value="option.value">
            {{ option.text }}
          </option>
        </select>
      </div>
      <br>
      <button id="btn-save" type="submit">Save changes</button>
    </form>
    <br>
    <button id="btn-delete" @click="deleteAuction()">Remove auction</button>
    <br><br>
  </div>
</template>

<script>
import axios from "axios";
import router from "../router";

export default {
    name: "AuctionEdit",
    props: ["auction", "currUser"],
    data () {
        return {
            options: [
                { text: "10 Seconds", value: 1000 * 10 },
                { text: "1 Hour", value: this.calculateData(1) },
                { text: "3 Hours", value: this.calculateData(3) },
                { text: "6 Hours", value: this.calculateData(6) },
                { text: "12 Hours", value: this.calculateData(12) },
                { text: "1 Day", value: this.calculateData(24) },
                { text: "3 Days", value: this.calculateData(24 * 3) },
                { text: "1 Week", value: this.calculateData(24 * 7) }
            ],
            formData: {
                id: this.auction._id,
                name: this.auction.name,
                price: this.auction.price,
                type: this.auction.type,
                duration: this.getDuration(),
                seller: this.currUser.username
            }
        };
    },
    methods: {
        getDuration () {
            if (this.auction.type === "Buy") {
                return this.calculateData(1);
            } else {
                return this.auction.duration;
            }
        },
        calculateData: function (multiplier) {
            const hour = 1000 * 60 * 60;
            const calculatedValue = hour * multiplier;
            return calculatedValue;
        },
        updateAuction () {
            if (this.formData.type === "Buy") {
                this.formData.duration = null;
            }
            axios
                .patch("/api/auction", this.formData)
                .then(() => {
                    location.reload();
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        deleteAuction () {
            const body = {
                id: this.auction._id
            };
            axios
                .delete("/api/auction", body)
                .then(() => {
                    router.push("/");
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        // refresh view data ($emit)
    }
};
</script>

<style lang="scss" scoped>
</style>
