import mongoose from "mongoose";
import config from "./config.js";

// Connect to MongoDB
mongoose.connect(config.database.url)
    .then(() => {
        console.log("MongoDB connected successfully");
    })
    .catch((error) => {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    });