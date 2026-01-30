import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import User from "../models/User"
import {JwtPayload} from "../types/auth"

export default async function auth(
    req: any,
    res: Response,
    next: NextFunction
) {
    try {
        const header = req.headers.authorization

        if (!header || !header.startsWith("Bearer "))
            return res.status(401).json({ message: "No token provided" })

        const token = header.split(" ")[1]


        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET!
        ) as JwtPayload


        const user = await User.findById(decoded.id)
        if (!user) return res.status(401).json({ message: "User not found" })

        req.user = user
        next()
    } catch (err) {
        res.status(401).json({ message: "Authentication failed" })
    }
}
