import { Request, Response } from "express";
import { ApiError } from "../utils/ApiError";
import User from "../models/userModel";
import { ApiResponse } from "../utils/ApiResponse";
import { uploadOnCloudinary } from "../utils/cloudinary";
import type { CookieOptions } from "express";

const generateAccessToken = async (userId: any): Promise<any> => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new ApiError(500, "User not found to generate accesss token");
        }
        const accessToken = user.generateAccessToken();
        return accessToken;
    } catch (error) {
        console.error("Error generating access token", error);
        return;
    }
};

export const registerUser = async (req: Request, res: Response) => {
    try {
        const { username, email, mobileNumber, password } = req.body;
        if (!username || !email || !mobileNumber || !password) {
            throw new ApiError(400, "All fields are required.");
        }

        const userAlreadyExists = await User.find({ email, mobileNumber });
        if (userAlreadyExists.length != 0) {
            throw new ApiError(400, "User Already Exists. Please Login");
        }

        const registeredUser = await User.create({
            username,
            email,
            mobileNumber,
            password,
        });
        if (!registeredUser) {
            throw new ApiError(404, "Error Occured while registering user.");
        }

        res.status(201).json(
            new ApiResponse(200, {}, "User Registered Sucessfully.")
        );
    } catch (error: any) {
        console.error(error);
        res.status(error?.statusCode || 500).json({ error: error });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { mobileNumber, email, password } = req.body;
        if (!mobileNumber || !email || !password) {
            throw new ApiError(400, "All Fields are required.");
        }

        const user = await User.findOne({ email, mobileNumber });
        if (!user) {
            throw new ApiError(404, "User Not Found.");
        }

        const isPasswordCorrect = user.isPasswordCorrect(password);
        if (!isPasswordCorrect) {
            throw new ApiError(400, "Incorrect Password.");
        }

        const accessToken = await generateAccessToken(user._id);

        const loggedInUser = await User.findOne({ email, mobileNumber }).select(
            "-password"
        );
        if (!loggedInUser) {
            throw new ApiError(404, "User Not Found");
        }

        const options: CookieOptions = {
            httpOnly: false,
            secure: false,
            sameSite: "none",
            maxAge: 24 * 60 * 60 * 1000,
            path: "/",
        };

        res.status(200)
            .cookie("accessToken", accessToken, options)
            .json(
                new ApiResponse(200, loggedInUser, "User LoggedIn Sucessfull.")
            );
    } catch (error: any) {
        console.error(error);
        res.status(error?.statusCode || 500).json({ error: error });
    }
};

export const logoutUser = async (req: Request, res: Response) => {
    try {
        res.cookie("accessToken", "", {
            maxAge: 0,
        });

        res.status(200).json(new ApiResponse(200, {}, "Logout Sucessfull."));
    } catch (error: any) {
        console.error(error);
        res.status(error?.statusCode || 500).json({ error: error });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id: currentUserId } = req.params;
        if (!currentUserId) {
            throw new ApiError(404, "User ID not found.");
        }

        const deletedUserInfo = await User.findByIdAndDelete(currentUserId);
        if (!deletedUserInfo) {
            throw new ApiError(404, "User Not Found");
        }

        res.status(200).json(
            new ApiResponse(
                200,
                deletedUserInfo,
                "Account Deleted sucessfully."
            )
        );
    } catch (error: any) {
        console.error(error);
        res.status(error?.statusCode || 500).json({ error: error });
    }
};

export const uploadProfile = async (req: Request, res: Response) => {
    try {
        const { id: currentUserId } = req.params;
        if (!currentUserId) {
            throw new ApiError(404, "User ID not found.");
        }

        const profilePic = req.file?.path;
        if (!profilePic) {
            throw new ApiError(400, "Image is required.");
        }

        const uploadedProfilePicture = await uploadOnCloudinary(profilePic);
        if (!uploadedProfilePicture) {
            throw new ApiError(
                500,
                "Error Occured while uploading profile picture."
            );
        }

        const user = await User.findByIdAndUpdate(currentUserId, {
            profilePic: uploadedProfilePicture.secure_url,
        }).select("-password");
        if (!user) {
            throw new ApiError(
                500,
                "Error Occured while updating profile picture."
            );
        }

        res.status(200).json(
            new ApiResponse(200, user, "Profile Picture Uploaded sucessfully.")
        );
    } catch (error: any) {
        console.error(error);
        res.status(error?.statusCode || 500).json({ error: error });
    }
};
