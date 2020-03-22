const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { User } = require("./models/user");
const config = require("./config/key");
mongoose
    .connect(config.mongoURI, {
        useNewUrlParser: true
    })
    .then(() => console.log("db connected"))
    .catch(err => console.log(err));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.post("/api/users/register", (req, res) => {
    const user = new User(req.body);
    user.save((err, userData) => {
        if (err) return res.json({ success: false });
        return res.status(200).json({ success: true });
    });
    res.send("success user added");
});

app.get("/", function(req, res) {
    res.send("Hello");
});

app.listen(5000);
