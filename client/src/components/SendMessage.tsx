import axios from "axios";
import React, { useState } from "react";
import userChats from "../zustands/useChats";
import toast, { Toaster } from "react-hot-toast";

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
        imageForm.append("image", image);
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
            className="border boreder-secondary flex justify-center items-center"
            onSubmit={handleSendMessage}
        >
            <div role="button" onClick={toggleFileInputBox} className="btn m-1">
                🏞️
            </div>
            {sendFileBox ? (
                <div className="w-fit">
                    <div
                        tabIndex={0}
                        className="flex justify-center items-center w-full card card-sm bg-base-100 z-1 shadow-md"
                    >
                        <input
                            id="image"
                            type="file"
                            className="file-input file-input-primary"
                            onChange={handleFileChange}
                        />
                        <button
                            onClick={handleSendImage}
                            className="btn btn-primary mx-1"
                        >
                            {sending ? "Sending..." : "Send Image"}
                        </button>
                    </div>
                </div>
            ) : (
                <div className="flex justify-center items-center">
                    <input
                        value={sendMessageInput}
                        onChange={(e) => setSendMessageInput(e.target.value)}
                        type="text"
                        placeholder="Type here"
                        className="input "
                    />
                    <button
                        onClick={handleSendMessage}
                        className="btn btn-primary"
                    >
                        {sending ? "Sending" : "Send"}
                    </button>
                </div>
            )}
            <Toaster position="bottom-right" />
        </form>
    );
};
export default SendMessage;
