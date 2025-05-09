import mongoose from "mongoose"

export const connectDB = async () => {
    try {
        console.log(process.env.MONGO_URI);
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (err) {
        console.log("Error connection to MongoDB:", err.message);
        process.exit(1); // 进程因错误退出 0 status code is success
    }
}