import { Request, Response } from "express"
import { AuthRequest } from "../types/types";
import Chat from "../models/chatModel";
import Message from "../models/messageModel";
import { ApiResponse } from "../utils/ApiResponse";
import { ApiError } from "../utils/ApiError";

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

        res.status(200).json(new ApiResponse(200, "Message Sent."))

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