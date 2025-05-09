import express from "express";
import { connectDB } from "./db/connectDB.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.get("/", (req, res) => {
    res.send("Hello World!");
})

app.listen(3000, () => {
    connectDB();
    console.log("Server is running on port 3000");
}) 

// 0g5u0Ss7bfGqBBwJ

// mongodb+srv://simonwuzy412:0g5u0Ss7bfGqBBwJ@auth-db.drca8ui.mongodb.net/?retryWrites=true&w=majority&appName=Auth-DB