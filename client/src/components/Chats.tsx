import { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/authContext";
import userChats from "../zustands/useChats";
import { useSocketContext } from "../context/socketContext";
import axios from "axios";
import Loader from "./Loader";

const Chats = () => {
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
        <div className="w-full overflow-scroll h-10/12">
            <div className="w-full">
                {loading ? (
                    <Loader />
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
                                        <a target="main" href={message?.image}>
                                            <img src={message?.image} />
                                        </a>
                                    </div>
                                </div>
                                <div
                                    className={`chat-bubble ${
                                        message.senderId === authUser.data._id
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
    );
};
export default Chats;
