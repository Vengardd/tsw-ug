import axios from "axios";
import auth from "../store/auth";

const state = {
    auctions: [],
    actualSite: 0
};

const getters = {
    auctions: state => state.auctions,
    actualSite: state => state.actualSite
};

const actions = {
    loadNewAuctions ({ commit }) {
        return axios.get(`${location.origin}/api/auctions` + "?page=" + (state.actualSite + 1), { withCredentials: true })
            .then(res => {
                commit("nextPage", res.data);
                console.log("next");
                console.log(res.data);
            }
            );
    },
    loadOwnNextAuctions ({ commit }) {
        const id = auth.getters.id;
        return axios.get(`${location.origin}/api/auctions/byUser` + "?id=" + id, { withCredentials: true })
            .then(res => {
                commit("startPage", res.data);
            }
            );
    },
    loadAllBidAuctions ({ commit }) {
        return axios.get(`${location.origin}/api/auctions/ownBids`, { withCredentials: true })
            .then(res => {
                commit("startPage", res.data);
            });
    },
    loadHistoryAuctions ({ commit }) {
        return axios.get(`${location.origin}/api/auctions/history`, { withCredentials: true })
            .then(res => {
                commit("startPage", res.data);
            }
            );
    },
    resetAuctions () {
        state.actualSite = 0;
        state.auctions = [];
    }
};

const mutations = {
    startPage (state, newAuctions) {
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
