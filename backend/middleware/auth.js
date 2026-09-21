import jwt from "jsonwebtoken"
import Admin from "../models/Admin.js"

async function protectAdmin(req, res, next) {
    const token = req.cookies.adminToken

    if (!token) {
        return res.status(401).json({
            message: "Admin authentication required"
        })
    }

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        )

        const admin = await Admin.findById(
            decoded.adminId
        )

        if (!admin) {
            return res.status(401).json({
                message: "Admin account not found"
            })
        }

        req.admin = admin

        next()
    } catch {
        return res.status(401).json({
            message: "Invalid or expired session"
        })
    }
}

export default protectAdmin