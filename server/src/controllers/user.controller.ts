import User from "../models/userModel";
import { AuthRequest } from "../types/types";
import { Response } from "express";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import Chat from "../models/chatModel";

export const searchUser = async (req: AuthRequest, res: Response) => {
    try {
        const searchQuery = req.query.search || "";
        const currentUserId = req.user?._id
        const user = await User.find({
            $and: [
                {
                    $or: [
                        { username: { $regex: '.*' + searchQuery + '.*', $options: 'i' } },
                        { email: { $regex: '.*' + searchQuery + '.*', $options: 'i' } }
                    ]
                }, {
                    _id: { $ne: currentUserId }
                }
            ]
        }).select("-password")

        if (!user || user.length == 0) {
            throw new ApiError(404, "No User Found")
        }

        res.status(200).json(new ApiResponse(200, user, "User Found."))

    } catch (error: any) {
        console.error(error);
        res.status(error?.statusCode || 500).json({ "error": error });
    }
}

// export const getCurrentChatter = async (req: AuthRequest, res: Response) => {
//     try {
//         const currentUserID = req.user?._id;
//         const currentChatters = await Chat.find({
//             participants: currentUserID
//         }).sort({
//             updatedAt: -1
//         });

//         if (!currentChatters || currentChatters.length === 0) return res.status(200).json(new ApiResponse(200, [], "No chatter currently"));

//         const partcipantsIDS = currentChatters.reduce((ids, conversation) => {
//             const otherParticipents = conversation.participants.filter(id => id !== currentUserID);
//             return [...ids, ...otherParticipents]
//         }, [])

//         const otherParticipentsIDS = partcipantsIds.filter(id => id.toString() !== currentUserID.toString());

//         const user = await User.find({ _id: { $in: otherParticipentsIDS } }).select("-password -email");

//         const users = otherParticipentsIDS.map(id => user.find(user => user._id.toString() === id.toString()));

//         res.status(200).json(new ApiResponse(200, users, "Current Chatter Fetched."))

//     } catch (error: any) {
//         console.error(error);
//         res.status(error?.statusCode || 500).json({ "error": error });
//     }
// }