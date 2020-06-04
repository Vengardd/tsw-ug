import Vue from "vue";
import Vuex from "vuex";

import auth from "./auth";
import auction from "./auction";
import socket from "./socket";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
    },
    mutations: {
    },
    actions: {
    },
    modules: {
        auth,
        auction,
        socket
    }
});
