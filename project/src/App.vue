<template>
  <div id="app">
    <Navbar />
    <img alt="Vue logo" src="./assets/logo.png">
    <!-- <PostComponent msg="Welcome to Your Vue.js App"/> -->
    <AuctionComponent />
    <router-link to="login">Login</router-link>
  </div>
</template>

<script>
// import PostComponent from "./components/PostComponent.vue";
// import io from "socket.io-client";
import AuctionComponent from "./components/AuctionComponent.vue";
import Navbar from "@/components/Navbar";
// import Login from "./components/Login";

// const socket = io("http://localhost:5000");

export default {
    name: "App",
    components: {
        // PostComponent,
        AuctionComponent,
        Navbar
        // Login
        // io
    }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
