import mongoose, { Schema } from "mongoose";
import { IChat } from "../types/types";

const conversationSchema: Schema<IChat> = new Schema({
    participants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message",
            default: []
        }
    ]
}, { timestamps: true })

const Chat = mongoose.model<IChat>('Chat', conversationSchema)

export default Chat;