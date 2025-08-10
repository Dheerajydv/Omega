import mongoose, { Document } from "mongoose";
import { Request } from "express";

export interface IUser extends Document {
    username: string;
    email: string;
    mobileNumber: number;
    password: string;
    friends?: mongoose.Types.ObjectId[];
    profilePic?: string;
}

export interface IUserMethods {
    generateAccessToken(): string;
    isPasswordCorrect(password: string): boolean;
}

export interface IMessage extends Document {
    senderId: mongoose.Types.ObjectId;
    recieverId: mongoose.Types.ObjectId;
    message?: string;
    image?: string;
    video?: string;
    chatId: mongoose.Types.ObjectId;
}

export interface AuthRequest extends Request {
    user?: IUser;
}

export interface IChat extends Document {
    participants: mongoose.Types.ObjectId[];
    messages: mongoose.Types.ObjectId[];
}
