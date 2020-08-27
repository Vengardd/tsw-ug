import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";

Vue.config.productionTip = false;

axios.create({
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:5000",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
    }
});

axios.interceptors.request.use(request => {
    console.log("Starting Request", request);
    return request;
});

new Vue({
    router,
    store,
    render: function (h) {
        return h(App);
    }
}).$mount("#app");
