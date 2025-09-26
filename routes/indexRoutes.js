const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    console.log("user entered webpage");
    const userID = req.cookies.userID || -1;
    res.render("index.ejs", { userID : userID });
})

module.exports = router;