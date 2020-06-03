import axios from "axios";
// import router from "../router";

const state = {
    auctions: [],
    actualSite: 1
};

const getters = {
    auctions: state => state.auctions,
    actualSite: state => state.actualSite
};

const actions = {
    startAuction ({ commit }) {
        axios.get("http://localhost:5000/api/auctions" + "?page=" + state.actualSite)
            .then(res => {
                commit("startPage", res.data);
                console.log("start");
                console.log(res.data);
            });
    },
    loadNextAuctions ({ commit }) {
        axios.get("http://localhost:5000/api/auctions" + "?page=" + (state.actualSite + 1))
            .then(res => {
                commit("nextPage", res.data);
                console.log("next");
                console.log(res.data);
            }
            );
    }
};

const mutations = {
    startPage (state, newAuctions) {
        console.log("ASDASDAS");
        state.actualSite = 1;
        state.auctions = newAuctions;
    },
    nextPage (state, newAuctions) {
        state.actualSite = state.actualSite + 1;
        state.auctions = state.auctions.concat(newAuctions);
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
