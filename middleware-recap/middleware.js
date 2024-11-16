const express = require("express")

const app = express()

// create a function to filter on basis of age

// function isOldEnough(req, res, next) {
//     if (age >= 14) {
//         return true;
//     } else {
//         return false;
//     }
// }


// Using Middleware: 
function isOldEnoughMiddleware(req, res, next) {
    const age = req.query.age;
    if (age >= 14) {
        next()
    } else {
        res.json({
            msg: "You're not eligible"
        })
    }
}

// if a middleware is needed to use in every route, then call it inside the app.use func
app.use(isOldEnoughMiddleware)

app.get("/ride1", isOldEnoughMiddleware, (req, res, next) => {
    res.json({
        msg: "you've successfully entered ride 1"
    })
})

app.get("/ride2", isOldEnoughMiddleware, (req, res) => {
    res.json({
        msg: "you've successfully entered ride 1"
    })
})

app.listen(3000)

