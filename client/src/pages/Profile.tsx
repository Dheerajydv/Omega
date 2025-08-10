import axios from "axios";
import { useAuth } from "../context/authContext";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import Loader from "../components/Loader";

const Profile = () => {
    const { authUser } = useAuth();
    const navigate = useNavigate();
    const [profilePic, setProfilePic] = useState<File | null>();
    const [uploading, setUploading] = useState(false);

    const deleteUser = async () => {
        try {
            const response = await axios.delete(
                `/api/auth/delete/${authUser.data._id}`
            );
            console.log(response);
            toast.success(response.data.message);
            navigate("/login");
        } catch (error: any) {
            console.log(error);
            toast.error(error.response.data.error.message);
        }
    };

    const uploadProfile = async (e: React.FormEvent) => {
        console.log("first");
        e.preventDefault();
        setUploading(true);
        const imageForm = new FormData();
        imageForm.append("profilePic", profilePic);
        try {
            const response = await axios.post(
                `/api/auth//upload-profile/${authUser.data._id}`,
                imageForm,
                {
                    withCredentials: true,
                }
            );
            toast.success(response.data.message);
        } catch (error: any) {
            console.log(error);
            toast.error(error.response.data.error.message);
        } finally {
            setUploading(false);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files[0]) {
            setProfilePic(files[0]);
        }
    };

    return (
        <div className="card bg-base-100 w-96 shadow-sm">
            <div className="card-body">
                <div className="avatar">
                    <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring-2 ring-offset-2">
                        <img
                            src={
                                authUser.data.profilePic
                                    ? authUser.data.profilePic
                                    : "../../public/user.png"
                            }
                        />
                    </div>
                </div>
                <div>
                    {authUser.data.profilePic ? (
                        <>
                            <button
                                className="btn"
                                onClick={() =>
                                    (
                                        document.getElementById(
                                            "my_modal_3"
                                        ) as HTMLDialogElement
                                    ).showModal()
                                }
                            >
                                Update Profile Picture
                            </button>
                            <dialog id="my_modal_3" className="modal">
                                <div className="modal-box">
                                    <form method="dialog">
                                        {/* if there is a button in form, it will close the modal */}
                                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                                            ✕
                                        </button>
                                    </form>
                                    <h3 className="font-bold text-lg">
                                        Upload New Profile Picture
                                    </h3>
                                    <p className="py-4">
                                        Press ESC key or click on ✕ button to
                                        close
                                    </p>
                                    <input
                                        onChange={handleFileChange}
                                        type="file"
                                        className="file-input"
                                    />
                                    <button
                                        onClick={uploadProfile}
                                        className="btn btn-primary"
                                    >
                                        {uploading ? <Loader /> : "Update"}
                                    </button>
                                </div>
                            </dialog>
                        </>
                    ) : (
                        <>
                            <button
                                className="btn"
                                onClick={() =>
                                    (
                                        document.getElementById(
                                            "my_modal_3"
                                        ) as HTMLDialogElement
                                    ).showModal()
                                }
                            >
                                Add Profile Picture
                            </button>
                            <dialog id="my_modal_3" className="modal z-100">
                                <div className="modal-box">
                                    <form method="dialog">
                                        {/* if there is a button in form, it will close the modal */}
                                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                                            ✕
                                        </button>
                                    </form>
                                    <h3 className="font-bold text-lg">
                                        Upload Profile Picture
                                    </h3>
                                    <p className="py-4">
                                        Press ESC key or click on ✕ button to
                                        close
                                    </p>
                                    <input
                                        onChange={handleFileChange}
                                        type="file"
                                        className="file-input"
                                    />
                                    <button
                                        onClick={uploadProfile}
                                        className="btn btn-primary"
                                    >
                                        {uploading ? <Loader /> : "Add Profile"}
                                    </button>
                                </div>
                            </dialog>
                        </>
                    )}
                </div>
                <h2 className="card-title">{authUser.data.username}</h2>
                <p>{`Registered On: ${new Date(
                    authUser.data.createdAt
                ).toLocaleDateString("en-IN")}`}</p>
                <p>{`Email: ${authUser.data.email}`}</p>
                <p>{`Mobile Number: ${authUser.data.mobileNumber}`}</p>
                <div className="card-actions justify-between items-center">
                    <button
                        className="btn btn-ghost"
                        onClick={() => navigate("/chats")}
                    >
                        <ArrowLeft />
                    </button>
                    <button onClick={deleteUser} className="btn btn-error">
                        Delete My Account
                    </button>
                </div>
            </div>
            <Toaster position="bottom-right" />
        </div>
    );
};
export default Profile;
