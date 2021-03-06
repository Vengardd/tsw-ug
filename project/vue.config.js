const path = require("path");

module.exports = {
    outputDir: path.resolve(__dirname, "./server/public"),
    configureWebpack: {
        devtool: "source-map"
    },
    devServer: {
        proxy: {
            "/api": {
                target: "https://localhost:5000"
            }
        }
    }
};
