const express = require("express");
const router = express.Router();

router.route("/login")
    .get((req, res) => {
        res.send("ebe ebe");
    });

module.exports = router;
