import express from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import Admin from "../models/Admin.js"
import protectAdmin from "../middleware/auth.js"
import { rateLimit } from "express-rate-limit"

const router = express.Router()

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 10,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        message:
            "Too many login attempts. Please try again later."
    }
})

function getCookieOptions() {
    const isProduction =
        process.env.NODE_ENV === "production"

    return {
        httpOnly: true,
        secure: isProduction,
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000
    }
}

router.post("/login", loginLimiter, async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            })
        }

        const admin = await Admin.findOne({
            email: email.toLowerCase()
        }).select("+passwordHash")

        if (!admin) {
            return res.status(401).json({
                message: "Invalid email or password"
            })
        }

        const passwordMatches = await bcrypt.compare(
            password,
            admin.passwordHash
        )

        if (!passwordMatches) {
            return res.status(401).json({
                message: "Invalid email or password"
            })
        }

        const token = jwt.sign(
            {
                adminId: admin._id,
                role: admin.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        )

        res.cookie(
            "adminToken",
            token,
            getCookieOptions()
        )

        res.json({
            admin: {
                id: admin._id,
                name: admin.name,
                email: admin.email,
                role: admin.role
            }
        })
    } catch {
        res.status(500).json({
            message: "Failed to log in"
        })
    }
})

router.get("/me", protectAdmin, (req, res) => {
    res.json({
        admin: {
            id: req.admin._id,
            name: req.admin.name,
            email: req.admin.email,
            role: req.admin.role
        }
    })
})

router.post("/logout", (req, res) => {
    const cookieOptions = getCookieOptions()

    res.clearCookie("adminToken", {
        httpOnly: cookieOptions.httpOnly,
        secure: cookieOptions.secure,
        sameSite: cookieOptions.sameSite
    })

    res.json({
        message: "Logged out successfully"
    })
})

export default router