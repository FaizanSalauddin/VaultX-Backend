import jwt from "jsonwebtoken";
import { User } from '../model/User.js'

export const isAuthenticated = async (req, res, next) => {
    try {
       
        const token = req.header("Authorization");

        if (!token) {
            return res
                .status(401)
                .json({ message: "Login First", success: false });
        }

        const decoded = jwt.verify(token, process.env.JWT);
        const id = decoded.userId;

        const user = await User.findById(id);
        if (!user) {
            return res
                .status(404)
                .json({ message: "User Not Found", success: false });
        }

        req.user = user;

        next();

    } catch (error) {
        console.error("Auth Middleware Error:", error);

        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token Expired", success: false });
        }
        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({ message: "Invalid Token", success: false });
        }

        res.status(500).json({ message: "Server Error", success: false });
    }
};
