const express = require("express");
const router = express.Router();
const accountHand = require("../database/accountHand");

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get("/login", (req, res) => {
    console.log("user entered login");
    res.render("login.ejs");
})

router.get("/register", (req, res) => { 
    console.log("user entered register");
    res.render("register.ejs")
})

router.get("/logout", (req, res) => {
    console.log("user entered logout");
    res.render("logout.ejs")
})

router.post("/register", async (req, res) => {
    const email = req.body.email;
    const user_name = req.body.user_name;
    const password = req.body.password;

    if (!email || !user_name || !password)
    {
        return res.status(400).json({ message: "All fields required." });
    }

    try
    {
        await accountHand.createAccount(email, user_name, password);
        return res.status(201).json({ message: "User registered!" });
        
    } catch (err)
    {
        if(err.message === "DUPLICATE_ACC") {
            return res.status(400).json({ message: "Duplicate account" })
        }
    }
});

router.post("/login", async (req, res) => {
    const user_name = req.body.user_name;
    const password = req.body.password;

    console.log(user_name, password);

    if(!user_name || !password)
    {
        return res.status(400).json({ message: "All fields required." });
    }

    try 
    {
        const userID = await accountHand.loginToAccount(user_name, password);

        res.cookie("userID", userID);

        return res.status(200).json({ message: "Logged in", userID: userID });
    } catch (err) {
        if(err.message === "INVALID_LOGIN") {
            return res.status(401).json({ message: "Invalid username or password" });
        }
        console.error("Login failed:", err);
        return res.status(500).json({ message: "Server error." });
    }
});

router.post("/logout", (res) => {
    res.cookie("userID", -1);
    res.status(200).json({ message: "Logged out" });
});

module.exports = router;