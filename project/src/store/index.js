import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

import auth from "./auth";

Vue.use(Vuex);

axios.interceptors.request.use(request => {
    console.log("Starting Request", request);
    return request;
});

export default new Vuex.Store({
    state: {
    },
    mutations: {
    },
    actions: {
    },
    modules: {
        auth
    }
});
