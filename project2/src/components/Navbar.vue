<template>
  <div class="navbar">
    <header>
      <nav>
        <ul>
          <li>
            <router-link to="/">Home</router-link>
          </li>
          <li v-if="isAuth" class="nav-item">
            <router-link to="/my-bids">My bids</router-link>
          </li>
          <li v-if="isAuth" class="nav-item">
            <router-link to="/my-auctions">My offers</router-link>
          </li>
          <li v-if="isAuth" class="nav-item">
            <router-link to="/my-history">My History</router-link>
          </li>
          <!-- on the right side -->
          <li v-if="isAuth" class="nav-item">
            <a @click="logout()">Log out</a>
          </li>
          <!-- <div v-else></div> -->
          <li v-if="!isAuth" class="nav-item">
            <router-link to="/login">Log in</router-link>
          </li>
          <li v-if="!isAuth" class="nav-item">
            <router-link to="/register">Register</router-link>
          </li>
        </ul>
      </nav>
    </header>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    name: "Navbar",
    computed: {
        ...mapGetters(["isAuth"])
    },
    methods: {
        logout () {
            this.$store.commit("authLogout");
            this.$router.push("/");
        }
    }
};
</script>

<style lang="scss" scoped>

* {
    margin: 0;
    padding: 0;
}

div {
  border-bottom: 1px solid black;
  ul {

    li {
        font-family: 'Montserrat', sans-serif;
        display: inline-block;
        a {
            padding: 20px 25px;
            text-decoration: none;
            color: black;
            font-weight: bold;
        }
        a:hover {
            color: greenyellow;
            cursor: pointer;
        }
    }
}
}

header {
    display: flex;
    width: 100%;
    padding: 20px;
}
</style>
