import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import User from "../Models/user.model.js";
import generateToken from "../Utils/generateToken.js";
import { sendwelComeEmail } from "../Emails/EmailHandler.js";
import cloudinary from "../lib/cloudinary.js";

export const signUp = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        if (!username || !password || !email) {
            return res.status(400).json({ success: false, message: "All fields are required !" });
        }
        if (password.length < 6) {
            return res.status(400).json({ success: false, message: "Password must be at least 6 characters long" });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email format"
            });
        }

        // if already exist
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                success: false,
                message: "user already exist"
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({ username, email, password: hashedPassword });

        await newUser.save();

        const token = generateToken(newUser._id, res);

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            token,
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                profiePic: newUser.profilePic
            }
        });

        // send a welcome email to user 

        try {
            await sendwelComeEmail(newUser.email, newUser.username, "https://www.youtube.com/shorts/eqNx9YD-Fik");

        } catch (error) {
            console.error("Failed to send welcome email")
        }


    } catch (error) {
        console.log("Error in the signup handler", error.message);
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

export const login = async (req, res) => {
    try {
        let { email, password } = req.body;
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid Credentials" });

        }

        let isMatch = await bcrypt.compare(password, user.password); // comapring the password 

        if (isMatch) {
            // generate token again 
            generateToken(user._id, res);
            res.json({ success: true, id: user._id, fullname: user.username, email: user.email });
            // console.log("user login successfully ");
        } else {
            return res.json({ success: false, message: "Invalid  Credentials" });

        }

    } catch (error) {
        console.log("error in login controller")
        res.json({ success: false, message: error.message })
    }


}

export const logout = async (req, res) => {
    try {
        res.cookie("token", "", { maxAge: 0 })
        res.status(200).json({ success: true, message: "logged out successfully" })
    } catch (error) {
     console.log("eror in logout") 
     res.status(500).json({ success: false, message: error.message })
    }
}


export const updateProfile = async(req,res)=>{
try {
    const {profilePic} = req.body;
    if(!profilePic){
       return  res.status(400).json({ success: false, message: "Profile picture is required " });

    }
    const userId = req.user._id;

    const uploadresponse = await cloudinary.uploader.upload(profilePic);

   const updatedUser =  await User.findByIdAndUpdate(userId,{profilePic:uploadresponse.secure_url},{new:true})
} catch (error) {
    
}
}
