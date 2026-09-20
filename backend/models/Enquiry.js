import mongoose from "mongoose"

const enquirySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true
        },

        phone: {
            type: String,
            trim: true,
            default: ""
        },

        message: {
            type: String,
            required: true,
            trim: true
        },

        type: {
            type: String,
            enum: [
                "general",
                "vehicle",
                "finance",
                "sell-car"
            ],
            default: "general"
        },
        vehicle: {
            carId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Car"
            },

            make: {
                type: String,
                trim: true
            },

            model: {
                type: String,
                trim: true
            },

            price: {
                type: Number
            },

            year: {
                type: Number
            },

            mileage: {
                type: Number
            },

            fuel: {
                type: String,
                trim: true
            },

            image: {
                type: String,
                default: ""
            }
        },

        status: {
            type: String,
            enum: [
                "new",
                "contacted",
                "closed"
            ],
            default: "new"
        }
    },
    {
        timestamps: true
    }
)

const Enquiry = mongoose.model(
    "Enquiry",
    enquirySchema
)

export default Enquiry