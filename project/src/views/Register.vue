<template>
  <div class="register">
    <h2>Register</h2>
<div class="wrapper">
    <form @submit.prevent="handleSubmit()" class="container ">
      <input v-model="user.username" type="text" name="username" id="username"
      placeholder="Username" minLength="3" required="">
      <input v-model="user.password" type="password" name="password" id="password"
      placeholder="Password" required="">
      <input v-model="user.email" type="text" name="email" id="email"
      placeholder="Email" required="">
      <input v-model="user.name" type="text" name="name" id="name"
      placeholder="Name" required="">
      <input v-model="user.surname" type="text" name="surname" id="surname"
      placeholder="Surname" required="">
      <button type="submit">Register</button>
    </form>
</div>

  </div>
</template>

<script>
import axios from "axios";
import router from "../router";

export default {
    name: "Register",
    data () {
        return {
            user: {
                username: "",
                password: "",
                email: "",
                name: "",
                surname: ""
            }
        };
    },
    methods: {
        handleSubmit () {
            axios
                .post("http://localhost:5000/register", this.user)
                .then(() => {
                    router.push("/login");
                })
                .catch((err) => {
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
