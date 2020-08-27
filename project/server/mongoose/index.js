require("dotenv").config();

const mongoose = require("mongoose");

(async () => {
    try {
        await mongoose.connect(process.env.DBURI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
})();

const db = mongoose.connection;

db.on("open", () => {
    console.log("Połączono z MongoDB!");
});

db.on("error", console.error.bind(console, "Błąd połączenia z MongoDb: "));

module.exports = mongoose;
