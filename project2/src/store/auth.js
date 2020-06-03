const state = {
    username: "",
    isAuth: false
};

const getters = {
    username: state => state.username,
    isAuth: state => state.isAuth
};

const actions = {
};

const mutations = {
    authRefresh (state, data) {
        console.log("authRefresh");
        console.log(data);
        state.username = data.username;
        state.isAuth = data.isAuth;
    },
    authLogout (state) {
        console.log("logout");
        state.username = null;
        state.isAuth = false;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
