<template>
  <div class="home">
    <h2>Available auctions</h2>
    <img alt="Vue logo" src="../assets/logo.png"><br>
    <div v-if="currentUser.isAuth">
      Welcome {{currentUser.username}}
    </div>
    <AuctionList v-bind:auctions="auctions"/>
  </div>
</template>

<script>
import axios from "axios";
import router from "../router";
import AuctionList from "@/components/AuctionList";
import { mapGetters } from "vuex";

export default {
    name: "Home",
    components: {
        AuctionList
    },
    data () {
        return {
            auctions: null
        };
    },
    computed: {
        ...mapGetters(["currentUser"])
    },
    methods: {
        goToAuctionForm () {
            router.push("/auction");
        }
    },
    created () {
        axios
            .get("http://localhost:5000/auctions")
            .then((resp) => {
                this.auctions = resp.data;
            })
            .catch((err) => {
                console.log(err);
            });
    }
};
</script>
