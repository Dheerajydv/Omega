import { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/authContext";
import userChats from "../zustands/useChats";
import axios from "axios";
import SendMessage from "./SendMessage";
import { useSocketContext } from "../context/socketContext";
import { ArrowLeft } from "lucide-react";

export interface ChatBoxProps {
    handleChatBack: any;
}

const ChatBox = ({ handleChatBack }: ChatBoxProps) => {
    const { messages, setMessages, selectedChat } = userChats();
    const { authUser } = useAuth();
    const [loading, setLoading] = useState(false);
    const { socket } = useSocketContext();
    const lastMessageRef = useRef<HTMLParagraphElement>(null);

    const getMessages = async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                `/api/messages/${selectedChat?._id}`
            );
            // console.log(response.data.data)
            setMessages(response.data.data);
        } catch (error) {
            setLoading(false);
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        socket?.on("newMessage", (newMessage) => {
            setMessages([...messages, newMessage]);
        });

        return () => {
            socket?.off("newMessage");
        };
    }, [socket, setMessages, messages]);

    useEffect(() => {
        getMessages();
    }, [selectedChat?._id, setMessages]);

    useEffect(() => {
        setTimeout(() => {
            lastMessageRef?.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
    }, [messages]);

    return (
        <>
            <div
                onClick={handleChatBack}
                className="navbar sticky z-10 top-0 bg-primary text-primary-content"
            >
                <button className="btn btn-ghost text-xl">
                    <ArrowLeft />
                </button>
                <div className="avatar flex justify-center items-center">
                    <div className="ring-primary mr-2 ring-offset-base-100 w-10 rounded-full ring-2 ring-offset-2">
                        <img
                            className="h-10"
                            src={
                                selectedChat.profilePic
                                    ? selectedChat.profilePic
                                    : "../../public/user.png"
                            }
                            alt="Profile Picture"
                        />
                    </div>
                    <h1 className="text-xl mr-4">{selectedChat.username}</h1>
                </div>
            </div>
            <div className="w-full h-full mb-72 flex flex-col justify-around">
                <div className="w-full h-5/6">
                    {loading ? (
                        <span className="loading loading-spinner text-primary"></span>
                    ) : (
                        messages?.length > 0 &&
                        messages?.map((message) => (
                            <div
                                className=""
                                key={message?._id}
                                ref={lastMessageRef}
                            >
                                <div
                                    className={`chat ${
                                        message.senderId === authUser.data._id
                                            ? "chat-end"
                                            : "chat-start"
                                    }`}
                                >
                                    <div
                                        className={`avatar ${
                                            message.image ? "" : "hidden"
                                        }`}
                                    >
                                        <div className="w-24 rounded">
                                            <a
                                                target="main"
                                                href={message?.image}
                                            >
                                                <img src={message?.image} />
                                            </a>
                                        </div>
                                    </div>
                                    <div
                                        className={`chat-bubble ${
                                            message.senderId ===
                                            authUser.data._id
                                                ? "bg-primary"
                                                : "bg-secondary"
                                        } ${message.image ? "hidden" : ""}`}
                                    >
                                        {message?.message}
                                    </div>
                                    <div className="chat-footer text-[10px] opacity-80">
                                        {new Date(
                                            message?.createdAt
                                        ).toLocaleDateString("en-IN")}
                                        {new Date(
                                            message?.createdAt
                                        ).toLocaleTimeString("en-IN", {
                                            hour: "numeric",
                                            minute: "numeric",
                                        })}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
            <div className="flex bg-primary w-full justify-center fixed items-center z-10 bottom-0 h-1/6">
                <SendMessage />
            </div>
        </>
    );
};
export default ChatBox;
