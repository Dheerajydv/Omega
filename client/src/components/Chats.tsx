import { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/authContext";
import userChats from "../zustands/useChats";
import { useSocketContext } from "../context/socketContext";
import axios from "axios";
import Loader from "./Loader";
import toast, { Toaster } from "react-hot-toast";

const Chats = () => {
    const { messages, setMessages, selectedChat } = userChats();
    const { authUser } = useAuth();
    const [loading, setLoading] = useState(false);
    const { socket } = useSocketContext();
    const lastMessageRef = useRef<HTMLParagraphElement>(null);
    const [chatRefreshTrigger, setChatRefreshTrigger] = useState(true);

    const getMessages = async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                `https://omega-p95o.onrender.com/api/messages/${selectedChat?._id}`,
                {
                    withCredentials: true,
                }
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

    const deleteMessage = async (msgId: string) => {
        setLoading(true);
        try {
            const response = await axios.delete(
                `https://omega-p95o.onrender.com/api/messages/delete/${msgId}`,
                {
                    withCredentials: true,
                }
            );
            // console.log(response.data.data);
            toast.success(response.data.message);
            setChatRefreshTrigger((prev) => !prev);
        } catch (error) {
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
    }, [selectedChat?._id, setMessages, chatRefreshTrigger]);

    useEffect(() => {
        setTimeout(() => {
            lastMessageRef?.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
    }, [messages]);

    return (
        <div className="w-full overflow-scroll h-10/12">
            <div className="w-full">
                {loading ? (
                    <Loader />
                ) : (
                    messages?.length > 0 &&
                    messages?.map((message) => (
                        <div key={message?._id} ref={lastMessageRef}>
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
                                        <a target="main" href={message?.image}>
                                            <img src={message?.image} />
                                        </a>
                                    </div>
                                </div>
                                <div
                                    className={`chat-bubble ${
                                        message.senderId === authUser.data._id
                                            ? "chat-bubble-primary"
                                            : "chat-bubble-secondary"
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
                                <div className="dropdown dropdown-end">
                                    <div
                                        tabIndex={0}
                                        role="button"
                                        className="btn btn-circle btn-ghost btn-xs text-info"
                                    >
                                        <svg
                                            tabIndex={0}
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            className="h-4 w-4 stroke-current"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                            ></path>
                                        </svg>
                                    </div>
                                    <div
                                        tabIndex={0}
                                        className="card card-sm dropdown-content bg-base-100 rounded-box z-1 w-16 shadow-sm"
                                    >
                                        <div
                                            onClick={() =>
                                                deleteMessage(message._id)
                                            }
                                            tabIndex={0}
                                            className="btn btn-error"
                                        >
                                            Delete
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
            <Toaster position="bottom-right" />
        </div>
    );
};
export default Chats;
