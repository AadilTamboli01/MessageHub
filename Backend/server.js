import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"
import dotenv from "dotenv";

dotenv.config()
import authRouter from "./Routes/auth.route.js"
import messageRouter from "./Routes/message.route.js"
import connectionToDB from "./lib/db.js";
import { arcjetProtection } from "./Middleware/arcjet.middleware.js";



const app = express();
connectionToDB();
// app.use(arcjetProtection);
app.use(express.json());
app.use(cookieParser())
app.use(cors({
  origin: "http://localhost:5173",  // frontend port
  credentials: true
}));
app.use(express.urlencoded({ extended: true }));


app.use("/api/auth", authRouter);
app.use("/api/message", messageRouter)


app.listen(3000, () => {
    console.log("Server start Listening on port 3000")
});