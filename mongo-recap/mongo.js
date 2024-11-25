const { strict } = require("assert")
const mongoose = require("mongoose")
const express = require("express")

// defining Schema: 
const UserSchema = new mongoose.Schema({
    username: String, 
    paassword: String
})

// defining Model: 
const User = mongoose.model('User', UserSchema)


// CRUD Ops: 

// CREATE DATA: [whenever user creating account]
User.create({
    username: req.body.username, 
    paassword: req.body.paassword
})


// READ DATA: 
User.findById("1")
User.findOne({
    username: "gouravchandra@gmail.com"  // find one entry with this username
})
User.find({
    username: "gouravchandra@gmail.com" // find multiple entries with this username
})
User.updateOne(
    // for the user with this id, push this courseId in their Purchase courses list
    {"id": "1"}, 
    {$push: {purchaseCourses: courseId}}
)


// UPDATE DATA: 
User.updateOne(
    {id: "1"}, 
    {paassword: "newPassword"}
)

User.update({}, {
    premium: true
})

// DELETE DATA: 
User.deleteOne({
    username: "gouravchandra935@gmail.com"
})

User.deleteMany({})

// JARGONS: 
// CLUSTER: A MACHINE TO RUN MULTIPLE DATABASES
// DATABASE: IN A CLUSTER WHERE RUNS DIFFERENT APPLICATIONS. EACH APPLICATION HAVE IT'S OWN DATABASE
// TABLE: THERE ARE TABLE FOR DIFFERENT SERVICES INSIDE A DATABASE