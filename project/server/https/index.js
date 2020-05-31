var path = require("path");

module.exports = (app) => {
    const fs = require("fs");
    const https = require("https");
    return https.createServer({
        key: fs.readFileSync(path.resolve("/Users/ckrawczyk/Projects/krawczyk-cezary/project/server/https/my.key")),
        cert: fs.readFileSync("/Users/ckrawczyk/Projects/krawczyk-cezary/project/server/https/my.crt")
    }, app);
};
