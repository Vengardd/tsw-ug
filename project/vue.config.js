module.exports = {
    devServer: {
        headers: { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Credentials": "true" },
        host: "0.0.0.0",
        port: 5000,
        // https: true,
        hotOnly: false
    }
};
