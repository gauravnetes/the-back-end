const express = require("express")

const app = express()

app.use(express.json());

app.post("/health-checkup", function(req, res) {
    // kidneys = [1, 2]
    const kidneys = req.body.kidneys; 
    const kidneyLength = kidneys.length; 

    res.send("Your kidney length is: " + kidneyLength)

})

// global catches: middleware which don't expose the backend to the client end if the server goes down
// Error handling middleware
app.use((err, req, res, next) => {
    res.json({
        msg: "sorry something is up with our server"
    })
})

app.listen(3000); 