import express from "express"
import Enquiry from "../models/Enquiry.js"
import Car from "../models/car.js"
import protectAdmin from "../middleware/auth.js"
import { rateLimit } from "express-rate-limit"

const router = express.Router()
const enquiryLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 5,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        message:
            "Too many enquiries submitted. Please try again later."
    }
})

router.post("/", enquiryLimiter, async (req, res) => {
    try {
        const {
            name,
            email,
            phone = "",
            message,
            type = "general",
            carId = null
        } = req.body

        if (!name || !email || !message) {
            return res.status(400).json({
                message: "Name, email and message are required"
            })
        }

        let vehicle

        if (carId) {
            const selectedCar = await Car.findById(carId)

            if (!selectedCar) {
                return res.status(404).json({
                    message: "Selected vehicle not found"
                })
            }

            vehicle = {
                carId: selectedCar._id,
                make: selectedCar.make,
                model: selectedCar.model,
                price: selectedCar.price,
                year: selectedCar.year,
                mileage: selectedCar.mileage,
                fuel: selectedCar.fuel,
                image: selectedCar.images?.[0] || ""
            }
        }

        const enquiry = await Enquiry.create({
            name,
            email,
            phone,
            message,
            type,
            vehicle
        })

        res.status(201).json({
            message: "Enquiry submitted successfully",
            enquiry
        })
    } catch (error) {
        console.error("Create enquiry error:", error)

        if (error.name === "ValidationError") {
            return res.status(400).json({
                message: "Invalid enquiry data"
            })
        }

        res.status(500).json({
            message: "Failed to submit enquiry"
        })
    }
})

router.get("/", protectAdmin, async (req, res) => {
    try {
        const enquiries = await Enquiry.find()
            .sort({ createdAt: -1 })

        res.json(enquiries)
    } catch (error) {
        console.error("Fetch enquiries error:", error)

        res.status(500).json({
            message: "Failed to fetch enquiries"
        })
    }
})
router.patch(
    "/:id/status",
    protectAdmin,
    async (req, res) => {
        try {
            const { status } = req.body

            const allowedStatuses = [
                "new",
                "contacted",
                "closed"
            ]

            if (!allowedStatuses.includes(status)) {
                return res.status(400).json({
                    message: "Invalid enquiry status"
                })
            }

            const updatedEnquiry =
                await Enquiry.findByIdAndUpdate(
                    req.params.id,
                    { status },
                    {
                        new: true,
                        runValidators: true
                    }
                )

            if (!updatedEnquiry) {
                return res.status(404).json({
                    message: "Enquiry not found"
                })
            }

            res.json(updatedEnquiry)
        } catch (error) {
            console.error(
                "Update enquiry status error:",
                error
            )

            if (error.name === "CastError") {
                return res.status(400).json({
                    message: "Invalid enquiry ID"
                })
            }

            res.status(500).json({
                message: "Failed to update enquiry status"
            })
        }
    }
)

export default router