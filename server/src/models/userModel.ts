import mongoose, { Schema, Model } from "mongoose";
import { IUser, IUserMethods } from "../types/types";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const userSchema: Schema<IUser, Model<IUser, {}, IUserMethods>> = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            default: "new_user"
        },
        email: {
            type: String,
            unique: true,
            required: true
        },
        mobileNumber: {
            type: Number,
            unique: true,
            required: true,
            minlength: [10, "Mobile Number Should be 10 characters."]
        },
        password: {
            type: String,
            required: true,
            minlength: [6, "Password must be more than 6 characters."]
        },
        friends: {
            type: mongoose.Types.ObjectId,
            ref: "User"
        }
    },
    { timestamps: true }
)


userSchema.pre("save", async function (next) {
    if (!this.isModified) return next();

    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.isPasswordCorrect = async function (
    password: string
): Promise<Boolean> {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = async function (): Promise<any> {
    return jwt.sign(
        {
            _id: this._id,
            username: this.username,
            email: this.email,
            mobileNumber: this.mobileNumber
        },
        process.env.ACCESS_SECRET_KEY!,
        {
            expiresIn: "10d",
        }
    );
};


const User = mongoose.model<IUser, Model<IUser, {}, IUserMethods>>("User", userSchema);

export default User;