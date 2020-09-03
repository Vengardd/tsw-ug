<template>
    <div class="wrapper">
            <form @submit.prevent="onSubmit()" ref="form" class="container">
            <label> title  </label>
            <input v-model="auction.title" type="text" name="title" id="title" minLength="3" required="" /> <br>
            <label> description  </label>
            <input v-model="auction.description" type="text" name="description" id="description" minLength="3" required="" /> <br>
            <label> duration  </label>
            <input v-model="auction.duration" type="number" name="duration" id="duration" required="" /> <br>
            <label> actual price  </label>
            <input v-model="auction.actualPrice" type="number" name="actualPrice" id="actualPrice" required="" /> <br>
            <label> is buy now  </label>
            <input v-model="auction.isBuyNow" type="checkbox" name="isBuyNow" id="isBuyNow" /> <br>
            <button type="submit">Create new</button>
        </form>
    </div>
</template>

<script>
import axios from "axios";
import router from "../router";

export default {
    data () {
        return {
            auction: {
                title: "",
                description: "",
                duration: 0,
                actualPrice: 0,
                isBuyNow: ""
            }
        };
    },
    name: "AuctionModifyComponent",
    methods: {
        onSubmit: function () {
            axios.post(`${location.origin}/api/auction/addOrUpdate`, this.auction, { withCredentials: true });
            console.log("added new auction");
            router.push("/myAuctions");
        }
    }
};
</script>
