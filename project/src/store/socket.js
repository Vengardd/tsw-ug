import io from "socket.io-client";

const state = {
    socket: io.connect(`${location.origin}`)
};

const getters = {
    getSocket: state => state.socket
};

const actions = {
    getMessages (receiver) {
        state.socket.emit("messages", receiver);
    },
    emitMessage ({ state }, { eventName, data }) {
        state.socket.emit(eventName, data);
    }
};

export default {
    state,
    getters,
    actions
};
