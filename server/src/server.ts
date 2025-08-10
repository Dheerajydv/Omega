import express from "express";
import dotenv from "dotenv";
import { dbConnect } from "./db/dbConnect";
import authRouter from "./routes/auth.route";
import messageRouter from "./routes/message.route";
import userRouter from "./routes/user.route";
import cookirParser from "cookie-parser";
import { app, server } from "./socketio/socket";
import cors, { CorsOptions } from "cors";

dotenv.config({ quiet: true });
app.use(cookirParser());
app.use(express.json({ limit: "10mb" }));
app.use(
    express.urlencoded({
        parameterLimit: 100000, // or a number that suits your needs
        limit: "50mb", // Also, adjust the size limit if you need to
        extended: true,
    })
);
// Define specific options for CORS (recommended for production)
const corsOptions: CorsOptions = {
    // Replace with your frontend's actual domain
    origin: "https://omega-frontend-wy0f.onrender.com",
    optionsSuccessStatus: 200,
};

// Enable CORS with the specified options
app.use(cors(corsOptions));

app.use("/api/auth", authRouter);
app.use("/api/messages", messageRouter);
app.use("/api/users", userRouter);

const port = process.env.PORT!;
if (!port) {
    throw new Error("Port is not defined in .env");
}

server.listen(port, () => {
    dbConnect();
    console.log(`Server Running on Port: ${port}`);
});
