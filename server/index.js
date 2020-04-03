const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { User } = require("./models/user");
const config = require("./config/key");
const { auth } = require("./middleware/auth");

mongoose
    .connect(config.mongoURI, {
        useNewUrlParser: true,
        useCreateIndex: true
    })
    .then(() => console.log("db connected"))
    .catch(err => console.log(err));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.post("/api/users/register", (req, res) => {
    const user = new User(req.body);
    user.save((err, userData) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({ success: true, userData: userData });
    });
});

app.post("/api/users/login", (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user) {
            return res.json({
                loginSuccess: false,
                message: "Auth failed, email not found"
            });
        }
        user.comparePassword(req.body.password, (err, isMatch) => {
            if (err) {
                res.json({
                    loginSuccess: false,
                    message: "error password"
                });
            }

            if (!isMatch) {
                return res.json({
                    loginSuccess: false,
                    message: "Incorrect password"
                });
            }
        });
        user.generateToken((err, user) => {
            if (err) {
                return res.status(400).send(err);
            }
            res.cookie("x_auth", user.token)
                .status(200)
                .json({ loginSuccess: true });
        });
    });
});

app.get("/", function(req, res) {
    res.send("Hello");
});

app.get("/api/users/auth", auth, (req, res) => {
    res.status(200).json({
        _id: req._id,
        _isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role
    });
});

app.get("/api/users/logout", auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user.id }, { token: "" }, (err, doc) => {
        if (err) {
            return res.json({ success: false, err });
        }
        return res.status(200).json({
            success: true
        });
    });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log("server is running on port " + port);
});
