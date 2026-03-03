import express from "express"
import { getAllContacts, getChatPartners, getMessagesByUserId, sendMessage } from "../Controllers/message.controller.js";
import { protectRoute } from "../Middleware/auth.middleware.js";
const router = express.Router();


router.use(protectRoute)

router.get("/contacts", getAllContacts)
router.get("/chat", getChatPartners

)
router.get("/:id", getMessagesByUserId)
router.post("/send/:id", sendMessage)

export default router;