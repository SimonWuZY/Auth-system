import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
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