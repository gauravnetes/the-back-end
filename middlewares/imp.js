const express = require("express")
const z = require("zod")

const app = express()

function middleware() {
    // function logic 
}

app.use(middleware) // here we just calling the function just by the name cause the funciton doesn't return a function itself

function anotherMiddleware() {
    // function logic
    return function(req, res, next) {
        // function logic
    } 
}

app.use(anotherMiddleware()) // now he calling the function by function cause the funciton return an function itself

app.use(express.json()) // same things happen here