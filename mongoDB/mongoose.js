const express = require("express")
const mongoose = require("mongoose")

const app = express()
app.use(express.json())

mongoose.connect("mongodb+srv://gourav:2D9R0IrPRa5NB7bk@cluster0.b6qfq.mongodb.net/")

const User = mongoose.model('users', { name: String, email: String, password: String });  // describe the model of the DB

app.post("/signup", async(req, res) => {
    const username = req.body.username
    const password = req.body.password
    const name = req.body.name

    const existingUser = await User.findOne({email: username})
    // CRUD: Create Read Update Delete
    if (existingUser) {
        return res.status(400).send("Username already exists")
    }

    const user = new User({
        name: name, 
        email: username, 
        password: password
    })

    user.save()
    res.json("User created successfully")
})

app.listen(3000)
