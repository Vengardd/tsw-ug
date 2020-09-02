<template>
    <div class="messenger">
        <input v-model="receiver" name="receiver" type="text" id="receiver">
        <select v-model="receiver">
        <option v-for="username in usernames" v-bind:key="username._id">
            {{ username.username }}
        </option>
        </select>
        <span>Selected: {{ selected }}</span>
        <button @click="getMessagesRest">Load Messages</button>
        <div v-if="showMessages">
             <li v-for="message in messages" :key="message._id">
                 From: {{message.sender}} To: {{message.receiver}} <br>
                 Message: {{message.message}}
            </li>
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
