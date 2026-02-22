import mongoose from "mongoose";
import config from "./config.js";

let isConnected = false;

export const connectDB = async () => {
    if (isConnected) {
        return;
    }

    if (!config.database.url) {
        throw new Error("Database URL is not defined in environment variables.");
    }

    try {
        const db = await mongoose.connect(config.database.url);
        isConnected = db.connections[0].readyState === 1;
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        throw error;
    }
};