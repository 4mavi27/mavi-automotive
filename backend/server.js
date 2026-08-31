import express from "express"
import cors from "cors"
import cars from "./data/cars.js"

const app = express()

app.use(cors())

const PORT = 5000


app.get("/api/cars", (req, res) => {
    res.json(cars)
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})