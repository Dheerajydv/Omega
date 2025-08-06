import { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/authContext";
import userChats from "../zustands/useChats"
import axios from "axios";
import SendMessage from "./SendMessage";
import { useSocketContext } from "../context/socketContext";

const ChatBox = () => {

    const { messages, setMessages, selectedChat, } = userChats();
    const { authUser } = useAuth();
    const [loading, setLoading] = useState(false);
    const { socket } = useSocketContext();
    const lastMessageRef = useRef<HTMLParagraphElement>(null);

    const getMessages = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`/api/messages/${selectedChat?._id}`);
            // console.log(response.data.data)
            setMessages(response.data.data)
        } catch (error) {
            setLoading(false);
            console.log(error);

        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        socket?.on("newMessage", (newMessage) => {
            setMessages([...messages, newMessage])
        })

        return () => { socket?.off("newMessage") };
    }, [socket, setMessages, messages])

    useEffect(() => {
        getMessages();
    }, [selectedChat?._id, setMessages])

    useEffect(() => {
        setTimeout(() => {
            lastMessageRef?.current?.scrollIntoView({ behavior: "smooth" })
        }, 100)
    }, [messages])

    return (
        <div>
            {selectedChat === null ? (<h1>{`Welcome ${authUser.data.username}`}</h1>) : (
                <>
                    {!loading && messages?.length > 0 && messages?.map((message) => (
                        <div className='text-white' key={message?._id} ref={lastMessageRef}>
                            <div className={`chat ${message.senderId === authUser.data._id ? 'chat-end' : 'chat-start'}`}>
                                <div className='chat-image avatar'></div>
                                <div className={`chat-bubble ${message.senderId === authUser.data._id ? 'bg-primary' : ''

                                    }`}>
                                    {message?.message}
                                </div>
                                <div className="chat-footer text-[10px] opacity-80">
                                    {new Date(message?.createdAt).toLocaleDateString('en-IN')}
                                    {new Date(message?.createdAt).toLocaleTimeString('en-IN', {
                                        hour: 'numeric', minute:
                                            'numeric'
                                    })}
                                </div>
                            </div>
                        </div>
                    ))}
                </>
            )}
            <SendMessage />
        </div>
    )
}
export default ChatBox