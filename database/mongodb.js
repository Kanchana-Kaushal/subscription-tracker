import mongoose from "mongoose";
import { databaseConnString } from "../config/env.js";

if (!databaseConnString) {
    throw new Error(
        "Please define mongodb connection string in the environment variable file."
    );
}

async function connectToDatabase() {
    try {
        await mongoose.connect(databaseConnString);
        console.log("Database connected successfully");
    } catch (err) {
        console.error("Error connecting the database " + err);
        process.exit(1);
    }
}

export default connectToDatabase;
