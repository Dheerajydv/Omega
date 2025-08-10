import React, { createContext, useContext } from "react";
import { useState } from "react";
import type { AuthContextType } from "../types/types";

export const AuthContext = createContext<AuthContextType | undefined>(
    undefined
);

const getInitialUser = () => {
    try {
        const item = localStorage.getItem("chatapp");
        // Parse the item if it exists, otherwise return null
        return item ? JSON.parse(item) : null;
    } catch (error) {
        // If parsing fails (e.g., corrupted data), log the error and return null
        console.error("Failed to parse user from localStorage", error);
        return null;
    }
};

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [authUser, setAuthUser] = useState(getInitialUser());
    return (
        <AuthContext.Provider value={{ authUser, setAuthUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("Authcontext not found");
    }
    return context;
};
