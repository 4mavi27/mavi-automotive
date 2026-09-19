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