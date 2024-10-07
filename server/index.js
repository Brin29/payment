import express from 'express'
import Stripe from 'stripe'
import cors from 'cors'

const app = express()

const stripe = new Stripe("sk_test_51OW2cUDdNCdWc3LAuYyNETm7NE9fdy36yaDeV6dDivWju8qyfk0C5YQVEbiSWNouA7tcwdeVhpC72f8R5wiMkTre001p0MovE8")

app.use(cors({ origin: "http://localhost:5173" }))
app.use(express.json)

app.post("/api/checkout", (req, res) => {
    console.log(req.body);
    res.send("received");
})


app.listen(3001, () => {
    console.log("Server on port", 3001)
})