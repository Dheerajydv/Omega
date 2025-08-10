import User from "../models/userModel";
import { AuthRequest, IUser } from "../types/types";
import { Response } from "express";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import Chat from "../models/chatModel";

export const searchUser = async (req: AuthRequest, res: Response) => {
    try {
        const searchQuery = req.query.search || "";
        const currentUserId = req.user?._id;
        const user = await User.find({
            $and: [
                {
                    $or: [
                        {
                            username: {
                                $regex: ".*" + searchQuery + ".*",
                                $options: "i",
                            },
                        },
                        {
                            email: {
                                $regex: ".*" + searchQuery + ".*",
                                $options: "i",
                            },
                        },
                    ],
                },
                {
                    _id: { $ne: currentUserId },
                },
            ],
        }).select("-password");

        if (!user || user.length == 0) {
            throw new ApiError(404, "No User Found");
        }

        res.status(200).json(new ApiResponse(200, user, "User Found."));
    } catch (error: any) {
        console.error(error);
        res.status(error?.statusCode || 500).json({ error: error });
    }
};

export const getCurrentChatters = async (req: AuthRequest, res: Response) => {
    try {
        // 1. Validate that a user is authenticated
        const currentUserID = req.user?._id;
        if (!currentUserID) {
            return res
                .status(401)
                .json(new ApiResponse(401, null, "User not authenticated"));
        }

        // 2. Find all conversations for the current user, sorted by the most recent update
        const conversations = await Chat.find({
            participants: currentUserID,
        }).sort({
            updatedAt: -1,
        });

        // 3. Handle the case where the user has no conversations
        if (!conversations || conversations.length === 0) {
            return res
                .status(200)
                .json(new ApiResponse(200, [], "No chatter currently"));
        }

        // 4. Extract a unique, ordered list of other participant IDs
        // The `reduce` method ensures we get a unique list of IDs while preserving
        // the order from the most recently updated chats.
        const otherParticipantIDs = conversations.reduce(
            (uniqueIds, conversation) => {
                conversation.participants.forEach((participantId) => {
                    const participantIdString = participantId.toString();
                    // Check if it's not the current user and not already in our result array
                    if (
                        participantIdString !== currentUserID.toString() &&
                        !uniqueIds.includes(participantIdString)
                    ) {
                        uniqueIds.push(participantIdString);
                    }
                });
                return uniqueIds;
            },
            [] as string[]
        );

        if (otherParticipantIDs.length === 0) {
            return res
                .status(200)
                .json(
                    new ApiResponse(
                        200,
                        [],
                        "No other participants found in chats."
                    )
                );
        }

        // 5. Fetch all participant user profiles in a single, efficient database query
        const participantUsers = await User.find({
            _id: { $in: otherParticipantIDs },
        }).select("-password -email"); // Exclude sensitive fields

        // 6. Sort the fetched user profiles to match the order of recent conversations
        // A database `$in` query doesn't guarantee order, so we re-sort it here efficiently.
        const userMap = new Map(
            (participantUsers as IUser[]).map((user) => [
                user.id.toString(),
                user,
            ])
        );
        const sortedUsers = otherParticipantIDs.map((id) => userMap.get(id));

        // 7. Send the final, sorted list of users
        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    sortedUsers,
                    "Current chatters fetched successfully."
                )
            );
    } catch (error: any) {
        console.error("Error in getCurrentChatters:", error);
        // Avoid sending raw error details to the client for security
        return res
            .status(500)
            .json(new ApiResponse(500, null, "Internal Server Error"));
    }
};
