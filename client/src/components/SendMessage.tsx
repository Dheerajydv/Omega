import axios from "axios";
import React, { useState } from "react";
import userChats from "../zustands/useChats";
import toast, { Toaster } from "react-hot-toast";
import { CircleArrowRight, Image } from "lucide-react";
import Loader from "./Loader";

const SendMessage = () => {
    const [sendMessageInput, setSendMessageInput] = useState("");
    const [sending, setSending] = useState(false);
    const { selectedChat, setMessages, messages } = userChats();
    const [image, setImage] = useState<File | null>(null);
    const [sendFileBox, setSetFileBox] = useState(false);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        setSending(true);
        try {
            const response = await axios.post(
                `/api/messages/send/${selectedChat?._id}`,
                { message: sendMessageInput }
            );
            toast.success(response.data.message);
            setMessages([...messages, response.data.data]);
        } catch (error: any) {
            console.log(error);
            toast.error(error.response.data.error.message);
        } finally {
            setSending(false);
            setSendMessageInput("");
        }
    };

    const handleSendImage = async (e: React.FormEvent) => {
        e.preventDefault();
        setSending(true);
        const imageForm = new FormData();
        imageForm.append("image", image as File);
        try {
            const response = await axios.post(
                `/api/messages/send-image/${selectedChat?._id}`,
                imageForm,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "",
                    },
                }
            );
            toast.success(response.data.message);
            setMessages([...messages, response.data.data]);
        } catch (error: any) {
            console.log(error);
            toast.error(error.response.data.error.message);
        } finally {
            setSending(false);
            setSendMessageInput("");
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files[0]) {
            setImage(files[0]);
        }
    };

    const toggleFileInputBox = () => {
        setSetFileBox((prev) => !prev);
    };

    return (
        <form
            className="h-1/12 w-full px-2 flex justify-center items-center"
            onSubmit={handleSendMessage}
        >
            <div
                role="button"
                onClick={toggleFileInputBox}
                className="btn m-1 w-1/12"
            >
                <Image />
            </div>
            {sendFileBox ? (
                <div className="w-11/12">
                    <div
                        tabIndex={0}
                        className="flex justify-center items-center w-full bg-base-100 z-1 shadow-md"
                    >
                        <input
                            id="image"
                            type="file"
                            className="file-input w-10/12 file-input-primary"
                            onChange={handleFileChange}
                        />
                        <button
                            onClick={handleSendImage}
                            className="btn btn-primary mx-1 w-2/12"
                        >
                            {sending ? <Loader /> : <CircleArrowRight />}
                        </button>
                    </div>
                </div>
            ) : (
                <div className="flex gap-1 w-11/12 justify-center items-center">
                    <input
                        value={sendMessageInput}
                        onChange={(e) => setSendMessageInput(e.target.value)}
                        type="text"
                        placeholder="Type here"
                        className="input input-primary w-10/12"
                    />
                    <button
                        onClick={handleSendMessage}
                        className="btn btn-primary w-2/12"
                    >
                        {sending ? <Loader /> : <CircleArrowRight />}
                    </button>
                </div>
            )}
            <Toaster position="bottom-right" />
        </form>
    );
};
export default SendMessage;
