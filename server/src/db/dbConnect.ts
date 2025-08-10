import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const MONGODB_URL = process.env.MONGODB_URL!;
if (!MONGODB_URL) {
    console.log(MONGODB_URL);
    throw new Error("MongoDB URL not defined in .env");
}

export const dbConnect = async () => {
    try {
        const db = await mongoose.connect(MONGODB_URL);
        console.log("✅Database Connected Sucessfully.");
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};
