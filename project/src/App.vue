<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <!-- <PostComponent msg="Welcome to Your Vue.js App"/> -->
    <AuctionComponent />
    <Login />
  </div>
</template>

<script>
// import PostComponent from "./components/PostComponent.vue";
import io from "socket.io-client";
import AuctionComponent from "./components/AuctionComponent.vue";
import Login from "./components/Login";

const socket = io('http://localhost');

export default {
    name: "App",
    components: {
        // PostComponent,
        AuctionComponent,
        Login,
        io
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
