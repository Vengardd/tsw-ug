import io from "socket.io-client";

const state = {
    socket: io.connect("http://localhost:5000")
};

const getters = {
    getSocket: state => state.socket
};

const actions = {
    getMessages (receiver) {
        state.socket.emit("messages", receiver);
    },
    emitMessage ({ state }, { eventName, data }) {
        console.log(eventName);
        console.log(data);
        state.socket.emit(eventName, data);
    }
};

export default {
    state,
    getters,
    actions
};
