const express = require("express"); 

const app = express(); 

app.get("/health-checkup", (req, res) => {
    const username = req.headers.username;
    const password = req.headers.password; 
    const kidneyId = req.query.kidneyId; 

    // Alternative way: 
    if (!(username === "gourav" && password === "123")) {
        res.status(400).json({"msg": "inputs are invalid"})
        return; 
    }
    if (!(kidneyId == 1 || kidneyId == 2)) {
        res.status(400).json({"msg": "inputs are invalid"})
        return; 
    }
    res.json({
        msg: "Your kidney is finee"
    })


    // Other way: 
    if (username === "gourav" && password === "123") {
        // do the logic
        if (kidneyId == 1 || kidneyId == 2) {
            res.json({
                msg: "your kidney is fine"
            })
        } else {
            res.json({
                msg: "bad input"
            })
        }
    }
})

// we can use app.get with multiple callback functions: 
app.get("/health-checkup", function(req, res, next) {
    console.log("from req1");  // suppose this functiion here is prechecks. And if the prechecks are done
    next() // we can call the next function which will execute the next function
}, function(req, res) {
    console.log("from req2"); 
}),  

app.listen(3002); 