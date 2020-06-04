
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
        axios.get(`${location.origin}/api/auctions` + "?page=" + state.actualSite)
            .then(res => {
                commit("startPage", res.data);
                console.log("start");
                console.log(res.data);
            });
    },
    loadAllNewAuctions ({ commit }) {
        axios.get(`${location.origin}/api/auctions` + "?page=" + (state.actualSite + 1), { withCredentials: true })
            .then(res => {
                commit("nextPage", res.data);
                console.log("next");
                console.log(res.data);
            }
            );
    },
    loadOwnNextAuctions ({ commit }) {
        axios.get(`${location.origin}/api/auctions/byUser` + "?id=" + state.id, { withCredentials: true })
            .then(res => {
                commit("startPage", res.data);
            }
            );
    },
    loadAllBidAuctions ({ commit }) {
        axios.get(`${location.origin}/api/auctions/ownBids`, { withCredentials: true })
            .then(res => {
                commit("startPage", res.data);
            });
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
