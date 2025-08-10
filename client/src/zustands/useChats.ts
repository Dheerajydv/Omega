import { create } from "zustand";

// Best Practice: Define a type for your store's state and actions
interface ChatState {
    selectedChat: any; // You can replace 'any' with a more specific type for a chat object
    setSelectedChat: (chat: any) => void;
    messages: any[]; // You can replace 'any' with a type for a message object
    setMessages: (messages: any[]) => void;
    addMessage: (newMessage: any) => void; // A better way to add one message
}

const userChats = create<ChatState>((set) => ({
    // 1. Initial State
    selectedChat: null,
    messages: [],

    // 2. Actions to update the state
    setSelectedChat: (chat) => set({ selectedChat: chat }),

    // Action to completely replace all messages
    setMessages: (messages) => set({ messages: messages }),

    // Action to add a single new message to the existing array
    addMessage: (newMessage) =>
        set((state) => ({
            messages: [...state.messages, newMessage],
        })),
}));

export default userChats;
