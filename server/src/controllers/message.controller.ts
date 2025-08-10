import { Request, Response } from "express"
import { AuthRequest, IMessage } from "../types/types";
import Chat from "../models/chatModel";
import Message from "../models/messageModel";
import { ApiResponse } from "../utils/ApiResponse";
import { ApiError } from "../utils/ApiError";
import { getReceiverSocketId, io } from "../socketio/socket";
import { uploadOnCloudinary } from "../utils/cloudinary";

export const sendMessage = async (req: AuthRequest, res: Response) => {
    try {
        const { message } = req.body;
        const { id: recieverId } = req.params;
        const senderId = req.user?.id;

        let chats = await Chat.findOne({
            participants: { $all: [senderId, recieverId] }
        })
        if (!chats) {
            chats = await Chat.create({
                participants: [senderId, recieverId]
            })
        }

        const newMessage = new Message({
            senderId,
            recieverId,
            message,
            chatId: chats._id
        })

        if (newMessage) {
            chats.messages.push(newMessage.id)
        }

        await Promise.all([chats.save(), newMessage.save()]);

        //SOCKET.IO function 
        const reciverSocketId = getReceiverSocketId(recieverId);
        if (reciverSocketId) {
            io.to(reciverSocketId).emit("newMessage", newMessage)
        }

        res.status(200).json(new ApiResponse(200, newMessage, "Message Sent."))

    } catch (error: any) {
        console.error(error);
        res.status(error?.statusCode || 500).json({ "error": error });
    }
}

export const sendImage = async (req: AuthRequest, res: Response) => {
    try {
        const { id: recieverId } = req.params;
        const senderId = req.user?.id;
        const image = req.file?.path;

        let chats = await Chat.findOne({
            participants: { $all: [senderId, recieverId] }
        })
        if (!chats) {
            chats = await Chat.create({
                participants: [senderId, recieverId]
            })
        }

        if (!image) {
            throw new ApiError(400, "Image not found.")
        }
        const uploadedImage = await uploadOnCloudinary(image)

        const newMessage = new Message({
            senderId,
            recieverId,
            image: uploadedImage?.secure_url,
            chatId: chats._id
        })

        if (newMessage) {
            chats.messages.push(newMessage.id)
        }

        await Promise.all([chats.save(), newMessage.save()]);

        //SOCKET.IO function 
        const reciverSocketId = getReceiverSocketId(recieverId);
        if (reciverSocketId) {
            io.to(reciverSocketId).emit("newMessage", newMessage)
        }

        res.status(200).json(new ApiResponse(200, newMessage, "Image Sent."))

    } catch (error: any) {
        console.error(error);
        res.status(error?.statusCode || 500).json({ "error": error });
    }
}

export const getMessages = async (req: AuthRequest, res: Response) => {
    try {
        const { id: recieverId } = req.params;
        const senderId = req.user?.id;

        const chats = await Chat.findOne({
            participants: { $all: [senderId, recieverId] }
        }).populate("messages")

        if (!chats) {
            throw new ApiError(404, "Chat Not Found.")
        }

        const message = chats.messages;

        res.status(200).json(new ApiResponse(200, message, "Messages Fetched."))

    } catch (error: any) {
        console.error(error);
        res.status(error?.statusCode || 500).json({ "error": error });
    }
}