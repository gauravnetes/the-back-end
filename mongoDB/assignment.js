const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const jwtPassword = "123456";

mongoose.connect(
    "mongodb+srv://gourav:2D9R0IrPRa5NB7bk@cluster0.b6qfq.mongodb.net/",
);

const User = mongoose.model("User", {
    name: String,
    username: String,
    password: String,
});

const app = express();
app.use(express.json());

async function userExists(username, password) {
    // should check in the database
    const existingUser = await User.findOne({email: username, password: password})
    return !!existingUser; // true if exists. false if not.
}

app.post("/signin", async function (req, res) {
    const username = req.body.username;
    const password = req.body.password;

    if (!(await userExists(username, password))) {
        return res.status(403).json({
            msg: "User doesnt exist in our in memory db",
        });
    }

    var token = jwt.sign({ username: username }, jwtPassword);
    return res.json({
        token,
    });
});

app.get("/users", async function (req, res) {
    const token = req.headers.authorization;
    try {
        const decoded = jwt.verify(token, jwtPassword);
        const username = decoded.username;
        // return a list of users other than this username from the database
        const users = await User.find({username: {$ne: username }})
        res.json({
            users
        })
    } catch (err) {
        return res.status(403).json({
            msg: "Invalid token",
        });
    }
});

app.listen(3000);