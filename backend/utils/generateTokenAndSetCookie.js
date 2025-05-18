import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (res, userId) => {
    console.log(process.env.JWT_SECRET);
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        // 预防 csrf 攻击
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    })

    return token;
}