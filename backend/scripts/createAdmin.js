import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import dotenv from "dotenv"
import Admin from "../models/Admin.js"

dotenv.config()

async function createAdmin() {
    try {
        const {
            MONGO_URI,
            ADMIN_NAME,
            ADMIN_EMAIL,
            ADMIN_PASSWORD
        } = process.env

        if (
            !MONGO_URI ||
            !ADMIN_NAME ||
            !ADMIN_EMAIL ||
            !ADMIN_PASSWORD
        ) {
            throw new Error(
                "Missing admin environment variables"
            )
        }

        if (ADMIN_PASSWORD.length < 12) {
            throw new Error(
                "Admin password must be at least 12 characters"
            )
        }

        await mongoose.connect(MONGO_URI)

        const email = ADMIN_EMAIL.toLowerCase()

        const existingAdmin = await Admin.findOne({
            email
        })

        if (existingAdmin) {
            throw new Error(
                "An admin with this email already exists"
            )
        }

        const passwordHash = await bcrypt.hash(
            ADMIN_PASSWORD,
            12
        )

        await Admin.create({
            name: ADMIN_NAME,
            email,
            passwordHash
        })

        console.log("Admin account created successfully")
    } catch (error) {
        console.error(
            "Failed to create admin:",
            error.message
        )

        process.exitCode = 1
    } finally {
        await mongoose.disconnect()
    }
}

createAdmin()