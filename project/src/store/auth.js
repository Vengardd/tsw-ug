import axios from "axios";
// import router from "../router";

const state = {
    currentUser: {
        username: null,
        isAuth: false
    }
};

const getters = {
    currentUser: state => state.currentUser
};

const actions = {
    fetchCurrentUser ({ commit }) {
        return new Promise((resolve, reject) => {
            axios.get("http://localhost:5000/currentUser", { withCredentials: true })
                .then((resp) => {
                    console.log("a");
                    console.log(resp.data);
                    commit("authRefresh", resp.data);
                    resolve(resp);
                })
                .catch((err) => {
                    console.log("b");
                    commit("authNotLoggedIn");
                    reject(err);
                });
        });
    }
};

const mutations = {
    authRefresh (state, data) {
        console.log(data);
        state.currentUser.username = data.username;
        state.currentUser.isAuth = data.isAuth;
    },
    authNotLoggedIn (state) {
        state.currentUser.username = null;
        state.currentUser.isAuth = false;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
