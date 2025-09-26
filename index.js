const express = require("express");
const app = express();
const PORT = 8080;
const path = require('path');
const indexRoutes = require("./routes/indexRoutes.js");
const accountHand = require("./routes/accountHand.js");
const cookieParser = require("cookie-parser");
const ejs = require("ejs");
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended : true }));
app.set("view engine", ejs);

app.use(cookieParser());
app.use(indexRoutes);
app.use(accountHand);

app.listen(PORT, () => {
    console.log(`Server running at localhost:${PORT}`);
})

