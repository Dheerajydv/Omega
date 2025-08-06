import axios from "axios";
import React, { useState } from "react"
import userChats from "../zustands/useChats";
import toast, { Toaster } from "react-hot-toast";

const SendMessage = () => {
    const [sendMessageInput, setSendMessageInput] = useState("");
    const [sending, setSending] = useState(false);
    const { selectedChat, setMessages, messages } = userChats();

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        setSending(true);
        try {
            const response = await axios.post(`/api/messages/send/${selectedChat?._id}`, { message: sendMessageInput })
            toast.success(response.data.message)
            setMessages([...messages, response.data.data])
        } catch (error: any) {
            console.log(error)
            toast.error(error.response.data.error.message);
        } finally {
            setSending(false);
            setSendMessageInput("");
        }
    }

    return (
        <form onSubmit={handleSendMessage}>
            <input value={sendMessageInput} onChange={(e) => setSendMessageInput(e.target.value)} type="text" placeholder="Type here" className="input" />
            <button onClick={handleSendMessage} className="btn btn-primary">{sending ? "Sending" : "Send"}</button>
            <Toaster position="bottom-right" />
        </form>
    )
}
export default SendMessage