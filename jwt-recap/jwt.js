const jwt = require("jsonwebtoken")

// generate, decode, verify

const value = {
    name: "gourav", 
    accNumber: "703742143",
}

// jwt
const token = jwt.sign(value, "secret")
console.log(token);

// this token has been generated using this secret, hence this token can only be verified using this secret 
// this is the token/chequebook: 
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZ291cmF2IiwiYWNjTnVtYmVyIjoiNzAzNzQyMTQzIiwiaWF0IjoxNzMxNTE2NTU1fQ.xhfb3HicluIYmPpeDC23JrkT9pVQRTnB5RxXUQXJy30

