const express = require("express"); 

const z = require("zod")

const app = express()

// zod is used for schema validation similar to input validation
// used for parsing. To check the user is sending the expected inputs

const mySchema = z.array(z.number()) // To validate the input is an array of numbers

// Another example of input validation using zod: 
// suppose our expected input format is: 
/*
{
    email: string => email
    password: atleast 8 lettrs
    country: "IN", "US"
}
*/

const schema = z.object({
    email: z.string(), 
    password: z.string().min(8),  // password should have min 8 letters
    country: z.literal("IN").or(z.literal("US"))  // literal means this specific thing. "or" is used to bind other options with literals
})

app.use(express.json())

app.post("/health-checkup", (req, res) => {
    const kidneys = req.body.kidneys
    const response = mySchema.safeParse(kidneys)
    if (!response.status) {
        res.status(411).json({
            msg: "Invalid Input !!"
        })
    } else {
        res.send({
            response
        })
    }

})

// {"response":{"success":false,"error":{"issues":[{"code":"invalid_type","expected":"array","received":"undefined","path":[],"message":"Required"}],"name":"ZodError"}}}

app.listen(3000)