import express from "express"
import { login, logout, signUp, updateProfile } from "../Controllers/auth.controller.js";
import { protectRoute } from "../Middleware/auth.middleware.js";
import { arcjetProtection } from "../Middleware/arcjet.middleware.js";
const router = express.Router();

router.get("/", arcjetProtection, (req, res) => {
    res.json({ success: true, message: "hello" })
})
router.post("/signup",  signUp)
router.post("/login", login)
router.post("/logout", arcjetProtection, logout)

router.put("/update-profile", arcjetProtection, protectRoute, updateProfile);

router.get("/check", protectRoute, (req, res) => {
    res.status(200).json({ success: true, user: req.user })
})

export default router;