import express from "express"
import cors from "cors"
//import cars from "./data/cars.js"
import mongoose from "mongoose"
import dotenv from "dotenv"
import Car from "./models/car.js"
import cloudinary from "./config/cloudinary.js"
import upload from "./middleware/upload.js"

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())


mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected")
    })
    .catch((error) => {
        console.log("MongoDB connection error:", error)
    })

const PORT = 5000

const uploadToCloudinary = (fileBuffer) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                folder: "mavi-automotive"
            },
            (error, result) => {
                if (error) {
                    reject(error)
                } else {
                    resolve(result)
                }
            }
        )

        stream.end(fileBuffer)
    })
}
app.post("/api/upload", upload.array("images", 25), async (req, res) => {
    try {
        const uploadResults = await Promise.all(
            req.files.map((file) =>
                uploadToCloudinary(file.buffer)
            )
        )

        const imageUrls = uploadResults.map(
            (result) => result.secure_url
        )

        res.status(200).json({
            images: imageUrls
        })
    } catch (error) {
        res.status(500).json({
            message: "Failed to upload images"
        })
    }
})


app.get("/api/cars", async (req, res) => {
    try {
        const cars = await Car.find()
        res.json(cars)
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch cars"
        })

    }
})
app.get("/api/cars/:id", async (req, res) => {
    try {
        const car = await Car.findById(req.params.id)

        if (!car) {
            return res.status(404).json({
                message: "Car not found"
            })
        }

        res.json(car)
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch car"
        })
    }
})

app.post("/api/cars", async (req, res) => {
    try {
        const newCar = await Car.create(req.body)

        res.status(201).json(newCar)
    } catch (error) {
        res.status(500).json({
            message: "Failed to add car"
        })
    }
})

app.delete("/api/cars/:id", async (req, res) => {
    try {
        const deletedCar = await Car.findByIdAndDelete(req.params.id)

        if (!deletedCar) {
            return res.status(404).json({
                message: "Car not found"
            })
        }

        res.json({
            message: "Car deleted successfully"
        })
    } catch (error) {
        res.status(500).json({
            message: "Failed to delete car"
        })
    }
})

app.put("/api/cars/:id", async (req, res) => {
    try {
        const updatedCar = await Car.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )

        if (!updatedCar) {
            return res.status(404).json({
                message: "Car not found"
            })
        }

        res.json(updatedCar)
    } catch (error) {
        res.status(500).json({
            message: "Failed to update car"
        })
    }
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})