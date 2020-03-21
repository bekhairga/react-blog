/** @format */

const express = require("express");
const app = express();
const mongoose = require("mongoose");
mongoose
    .connect(
        "mongodb+srv://Klaun:7408449da7@react-app-jzdkz.mongodb.net/test?retryWrites=true&w=majority",
        {
            useNewUrlParser: true
        }
    )
    .then(() => console.log("db connected"))
    .catch(err => console.log(err));

app.get("/", function(req, res) {
    res.send("Hello");
});

app.listen(5000);
