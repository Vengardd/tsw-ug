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
            <button type="submit">Apply changes</button>
        </form>
    </div>
</template>

<script>
import axios from "axios";

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
    props: ["oldAuction"],
    methods: {
        onSubmit: function () {
            axios.post(`${location.origin}/api/auction/addOrUpdate`, this.auction, { withCredentials: true })
                .then(() => window.location.reload());
        }
    },
    created () {
        this.auction._id = this.oldAuction._id;
        this.auction.title = this.oldAuction.title;
        this.auction.description = this.oldAuction.description;
        this.auction.duration = this.oldAuction.duration;
        this.auction.actualPrice = this.oldAuction.actualPrice;
        this.auction.isBuyNow = this.oldAuction.isBuyNow;
    }

};
</script>
