import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateVerificationToken } from "../utils/generateVerificationToken.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
export const signup = async (req, res) => {
    const {email, password, name} = req.body;
    try {
        if(!email || !password || !name) {
            throw new Error("All fields are required");
        }
        const userAlreadyExists = await User.findOne({email});
        if(userAlreadyExists) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }

        // 密码加密
        // bcrypt.hash(明文密码, 加密强度)
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const verificationToken = generateVerificationToken();
        
        const user = new User({
            email,
            password: hashedPassword,
            name,
            verificationToken: verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours 
        });

        await user.save();

        // jwt 鉴权        
        generateTokenAndSetCookie(res, user._id);

        res.status(201).json({
            success: true,
            message: "User created successfully",
            user:{
                ...user._doc,
                password: undefined,
            }
        })
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message,
        })
    }
}

export const login = async (req, res) => {
    res.send("Login");
}

export const logout = async (req, res) => {
    res.send("Logout");
}