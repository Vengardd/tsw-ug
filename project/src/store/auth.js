const state = {
    id: "",
    username: "",
    isAuth: false
};

const getters = {
    id: state => state.id,
    username: state => state.username,
    isAuth: state => state.isAuth
};

const actions = {
};

const mutations = {
    authRefresh (state, data) {
        console.log(data);
        state.id = data.id;
        state.username = data.username;
        state.isAuth = data.isAuth;
    },
    authLogout (state) {
        state.id = "";
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
