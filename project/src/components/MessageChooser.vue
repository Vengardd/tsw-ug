<template>
    <div class="container">
        <input v-model="receiver" name="receiver" type="text" id="receiver">
        <select v-model="receiver">
        <option v-for="username in usernames" v-bind:key="username._id">
            {{ username.username }}
        </option>
        </select>
        <span>Selected: {{ selected }}</span>
        <button @click="getMessagesRest">Load Messages</button>
        <div v-if="showMessages">
             <ul v-for="message in messages" :key="message._id" class="messages">
                 <li class="ours" v-if="message.sender === username">
                 {{message.message}}
                 </li>
                 <li v-if="message.sender !== username">
                 {{message.message}}
                 </li>
            </ul>
            <form @submit.prevent="sendMessage">
                <label>Message: </label>
                <input v-model="message" name="message" type="text">
            <button type="submit">Send message</button>
            </form>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import { mapActions, mapGetters } from "vuex";
const io = require("socket.io-client");

export default {
    data () {
        return {
            messages: [],
            message: "",
            receiver: "",
            showMessages: false,
            socket: io(`${location.origin}`),
            usernames: ""
        };
    },
    computed: {
        ...mapGetters(["username"])
    },
    methods: {
        ...mapActions(["emitMessage", "getMessages"]),
        getMessagesRest: function () {
            console.log("Get messages rest");
            console.log(this.username);
            axios.get(`${location.origin}/api/messages` + "?receiver=" + this.receiver + "&sender=" + this.username, { withCredentials: true })
                .then(res => {
                    this.showMessages = true;
                    this.messages = res.data;
                }
                )
                .catch(err => {
                    console.log(err);
                });
        },
        sendMessage: function () {
            console.log("Send message");
            console.log(this.username);
            this.emitMessage({
                eventName: "sendMessage",
                data: {
                    receiver: this.receiver,
                    sender: this.username,
                    message: this.message
                }
            });
        },
        bidSockets: function () {
            this.socket.on("message", (data) => {
                console.log(data);
                if (data.receiver === this.username || data.sender === this.username) {
                    this.messages.push(data);
                }
            });
        },
        getUsernames: function () {
            axios.get(`${location.origin}/api/allUsernames`)
                .then(res => {
                    this.usernames = res.data;
                    console.log(this.usernames);
                });
        }
    },
    mounted () {
        this.bidSockets();
        this.getUsernames();
    }
};
</script>

<style lang="scss" scoped>
div{
  .messages
    {
        display: flex;
        flex-direction: column;
        justify-items: center;
        list-style-type: none;

        // height: 300px;
        width: 400px;
    }
    li{
        align-self: flex-start;
        list-style-type: none;
        border-radius: 25px;
        border-color: black;
        background:#7fffbf;
    }
  li.ours
  {
      align-self: flex-end;
      list-style-type: none;
      border-radius: 25px;
      border-color: blue;
      background: #B9DEFF;
  }
}
</style>
