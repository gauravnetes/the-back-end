const express = require("express");
const app = express();
var users = [{
    name: "john",
    kidneys: [{
        healthy: false,
    }]
}];

app.use(express.json());

app.get("/", (req, res) => {
    // logic: 
    const johnKidneys = users[0].kidneys;
    const numOfKidneys = johnKidneys.length;
    let numOfHealthyKidneys = 0;
    for (let i = 0; i < johnKidneys.length; i++) {
        if (johnKidneys[i].healthy) {
            numOfHealthyKidneys = numOfHealthyKidneys + 1;
        }
    }
    const numOfUnhealthyKidneys = numOfKidneys - numOfHealthyKidneys;
    res.json({
        numOfKidneys,
        numOfHealthyKidneys,
        numOfUnhealthyKidneys
    })
})

app.post("/", (req, res) => {
    // logic: put a unhealthy kidney in the user data whenever a post request happens
    const isHealthy = req.body.isHealthy;
    users[0].kidneys.push({
        healthy: isHealthy,
    });
    res.json("Done");
})

app.put("/", (req, res) => {
    // update kidneys to healthy kidneys
    for (let i = 0; i < users[0].kidneys.length; i++) {
        users[0].kidneys[i].healthy = true;
    }
    res.json({});
})

app.delete("/", (req, res) => {
    // remove the unhealthy kidneys
    // if there's no unhealthy kidneys. backend should send 411 status code.
    if (isThereatleastOneUnhealthyKidney()) {
        const newKidneys = [];
        for (let i = 0; i < users[0].kidneys.length; i++) {
            if (users[0].kidneys[i].healthy) {
                newKidneys.push({
                    healthy: true
                })
            }
        }
        users[0].kidneys = newKidneys;
        res.json({ msg: "done" });
    } else {
        res.status(411).json({
            msg: "You don't have unhealthy Kidneys. Why You wanna remove!"
        })
    }
})

function isThereatleastOneUnhealthyKidney() {
    let atleastOneUnhealthyKidney = false
    for (let i = 0; i < users[0].kidneys.length; i++) {
        if (!users[0].kidneys[i].healthy) {
            atleastOneUnhealthyKidney = true;
        }
    }
    return atleastOneUnhealthyKidney;
}

app.listen(3000); 