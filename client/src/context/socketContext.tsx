import React, { createContext, useContext, useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import { useAuth } from "./authContext";

// Define the shape of the context value
interface SocketContextType {
    socket: Socket | null;
    onlineUsers: string[]; // Assuming online users are represented by their IDs (strings)
}

const SocketContext = createContext<SocketContextType | null>(null);

export const useSocketContext = (): SocketContextType => {
    // Get the context value
    const context = useContext(SocketContext);

    // If the context is null or undefined, it means you're using the hook
    // outside of its provider. Throw an error.
    if (!context) {
        throw new Error(
            "useSocketContext must be used within a SocketContextProvider"
        );
    }

    // If the check passes, TypeScript knows 'context' is not null from here on.
    return context;
};
export const SocketContextProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    // State with explicit types
    const [socket, setSocket] = useState<Socket | null>(null);
    const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

    // Assuming useAuth is typed and returns { authUser: AuthUser | null }
    const { authUser }: { authUser: any | null } = useAuth();

    useEffect(() => {
        if (authUser) {
            // The 'io' function returns a Socket instance
            const newSocket: Socket = io("https://omega-p95o.onrender.com", {
                // Use http for local development unless you have SSL configured
                query: {
                    userId: authUser.data._id,
                },
            });

            setSocket(newSocket);

            // Listen for online users from the server
            newSocket.on("getOnlineUsers", (users: string[]) => {
                setOnlineUsers(users);
            });

            // Cleanup function to close the socket when the component unmounts or authUser changes
            return () => {
                newSocket.close();
            };
        } else {
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authUser]);

    return (
        <SocketContext.Provider value={{ socket, onlineUsers }}>
            {children}
        </SocketContext.Provider>
    );
};
