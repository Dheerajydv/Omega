import { createServer } from "http";
import { Server } from "socket.io";
import express from "express";

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})

const userSocketmap: Record<string, string> = {}; //{userId,socketId}

export const getReceiverSocketId = (receiverId: string) => {
    return userSocketmap[receiverId];
};


io.on('connection', (socket) => {
    const queryUserId = socket.handshake.query.userId;

    // 2. Ensure userId is a single string.
    const userId = Array.isArray(queryUserId) ? queryUserId[0] : queryUserId;

    if (userId) {
        userSocketmap[userId] = socket.id;
    }

    io.emit("getOnlineUsers", Object.keys(userSocketmap))

    socket.on('disconnect', () => {
        if (userId) {
            delete userSocketmap[userId];
            io.emit('getOnlineUsers', Object.keys(userSocketmap));
        }
    });
});

export { app, server, io }