import mongoose from "mongoose"

const carSchema = new mongoose.Schema({
    make: String,
    model: String,
    price: Number,
    year: Number,
    mileage: Number,
    fuel: String,
    transmission: String,
    featured: Boolean
})

carSchema.set("toJSON", {
    transform: (doc, ret) => {
        ret.id = ret._id.toString()
        delete ret._id
        delete ret.__v
    }
})

const Car = mongoose.model("Car", carSchema)

export default Car