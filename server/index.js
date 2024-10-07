import express from 'express'
import stripe from 'stripe'
import cors from 'cors'

const app = express()

app.use(cors({ origin: "http://localhost:5173" }))
app.use(express.json)

app.post("/api/checkout", (req, res) => {
    console.log(req.body);
    res.send("received");
})


app.listen(3001, () => {
    console.log("Server on port", 3001)
})