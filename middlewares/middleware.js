const express = require("express");

const app = express();


function userMiddleware(req, res, next) {
    const username = req.headers.username;
    const password = req.headers.password;
    if (username != "gourav" && password != "pass") {
        res.status(403).json({
            msg: "invalid inputs"
        })
    } else {
        next();
    }
};

function kidneyMiddleware(req, res, next) {
    const kidneyId = req.query.kidneyId;
    if (kidneyId != 1 && kidneyId != 2) {
        res.status(403).json({
            msg: "invalid input"
        })
    } else {
        next();
    }
};

let numOfRequests = 0;
function calculateRequests(req, res, next) {
    numOfRequests++
    console.log(numOfRequests);
    next()
}
app.use(calculateRequests) // any routes comes after this will have this middleware added
app.use(express.json()); // calling the funciton cause .json() is a funciton itself
// and here I'm expecting json as an input. Please parse out json as an input from this specific request


app.get("/health-checkup", userMiddleware, kidneyMiddleware, (req, res, next) => {
    // code logic
    res.send("Your heart is healthy");
})

app.get("/kidney-checkup", userMiddleware, kidneyMiddleware, (req, res) => {
    // code here
    res.send("Your kidney is healthy");
})

app.listen(3001); 