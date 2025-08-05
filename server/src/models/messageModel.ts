import mongoose, { Schema } from "mongoose";
import { IMessage } from "../types/types";


const messageSchema: Schema<IMessage> = new Schema(
    {
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        recieverId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        message: {
            type: String,
            required: true
        },
        chatId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Conversation',
            default: []
        },
    },
    { timestamps: true }
)

const Message = mongoose.model<IMessage>("Message", messageSchema)

export default Message;