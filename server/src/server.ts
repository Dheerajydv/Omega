import express from "express";
import dotenv from "dotenv"
import { dbConnect } from "./db/dbConnect";
import authRouter from "./routes/auth.route";
import messageRouter from "./routes/message.route"
import userRouter from "./routes/user.route"
import cookirParser from "cookie-parser";
import { app, server } from "./socketio/socket";

dotenv.config({ quiet: true });
app.use(express.json());
app.use(cookirParser());

app.use("/api/auth", authRouter)
app.use("/api/messages", messageRouter)
app.use("/api/users", userRouter)

const port = process.env.PORT!;
if (!port) {
    throw new Error("Port is not defined in .env")
}

server.listen(port, () => {
    dbConnect();
    console.log(`Server Running on Port: ${port}`);
})