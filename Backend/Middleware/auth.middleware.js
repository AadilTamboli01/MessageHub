
import jwt from "jsonwebtoken";
import User from "../Models/user.model.js";

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ success: false, message: "Unauthorized user" });
        }
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        if (!decode) {
            return res.status(401).json({ success: false, message: "Unauthorized , Invalid Token" });
        }

        const user = await User.findById(decode.userId).select("-password");
        if (!user) {
            return res.status(404).json({ success: false, message: "user not found" });
        }

        req.user = user

        next()
    } catch (error) {
        console.log("error in the protect Route",error)
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}
