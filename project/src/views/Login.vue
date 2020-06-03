<template>
    <div class="login">
        <h2>Log in</h2>
        <div class="wrapper">
             <form @submit.prevent="handleSubmit()" ref="form" class="container">
            <input v-model="user.username" type="text" name="username" id="username" placeholder="Username" minLength="3" required="" />
            <input v-model="user.password" type="password" name="password" id="password" placeholder="Password" required="" />
            <button type="submit">Log in</button>
        </form>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import router from "../router";
import { mapGetters, mapActions } from "vuex";

export default {
    name: "Login",
    data () {
        return {
            user: {
                username: "",
                password: ""
            }
        };
    },
    computed: {
        ...mapGetters(["username"])
    },
    methods: {
        ...mapActions(["getUser"]),
        handleSubmit () {
            axios
                .post("http://localhost:5000/api/login", this.user)
                .then(res => {
                    this.$store.commit("authRefresh", { username: this.user.username, isAuth: true });
                    router.push("/");
                })
                .catch(err => {
                    this.$store.commit("authLogout");
                    console.log(err);
                });
        }
    }
};
</script>

<style lang="scss" scoped>
h2 {
    font-family: 'Montserrat', sans-serif;
    text-align: center;
    margin-top: 50px;
}
div{
    .wrapper{
        display: flex;
        justify-content:center;
    }
    .container {
        width: 500px;
        height: 100px;
        display: flex;
        flex-direction:column;
        align-items:center;

        }
    button{
        border:none;
        background-color: white;
        width: 200px;
        border: 1px solid black;
        padding: 10px 60px;
        border-radius: 20px;
        margin-top:20px;
        cursor: pointer;
    }
    input{
        margin-top: 20px;
        border-radius: 20px;
        border:none;
        border: 1px solid black;
        text-align: center;
        padding:10px 10px;
    }
    input:focus {
        border:1px solid orange !important;
         outline: none
        }
    ::placeholder{ color: orange}
    }
</style>
