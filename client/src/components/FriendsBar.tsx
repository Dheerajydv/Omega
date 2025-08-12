import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import userChats from "../zustands/useChats";
import { useSocketContext } from "../context/socketContext";
import SearchBar from "./SearchBar";
import Loader from "./Loader";

const FriendsBar = ({ onSelectUser }: any) => {
    const [loading, setLoading] = useState(false);
    const [chatUser, setChatUser] = useState<any>([]);
    const [selectedUserId, setSetSelectedUserId] = useState(null);
    const { setSelectedChat, messages } = userChats();
    const { onlineUsers, socket } = useSocketContext();
    const [newMessageUsers, setNewMessageUsers] = useState("");
    const nowOnline = chatUser.map((user: any) => user._id);
    const isOnline = nowOnline.map((userId: any) =>
        onlineUsers.includes(userId)
    );

    useEffect(() => {
        socket?.on("newMessage", (newMessage: any) => {
            setNewMessageUsers(newMessage);
        });
        return () => {
            socket?.off("newMessage");
        };
    }, [socket, messages]);

    const chatUserHandler = async () => {
        setLoading(true);
        console.log(newMessageUsers);
        try {
            const response = await axios.get(
                `https://omega-p95o.onrender.com/api/users/current-chatter`,
                {
                    withCredentials: true,
                }
            );
            setChatUser(response.data.data);
        } catch (error: any) {
            console.log(error.response.data.error.message);
            toast.error(error.response.data.error.message);
        } finally {
            setLoading(false);
        }
    };

    //show which user is selected
    const handleUserClick = (user: any) => {
        onSelectUser(user);
        setSelectedChat(user);
        setSetSelectedUserId(user._id);
    };

    useEffect(() => {
        chatUserHandler();
    }, []);

    return (
        <div className="w-full flex flex-col justify-start mt-4 h-full items-center">
            <SearchBar handleUserClick={handleUserClick} />
            {/* All friends section */}
            {loading ? (
                <Loader />
            ) : (
                <div className="w-full">
                    <div>
                        <ul className="list gap-2 bg-base-300 rounded-box shadow-md">
                            {chatUser.map((user: any, index: any) => (
                                <li
                                    onClick={() => handleUserClick(user)}
                                    key={user._id}
                                    className={`list-row ${
                                        user._id == selectedUserId
                                            ? "bg-base-100"
                                            : "bg-base-300"
                                    } `}
                                >
                                    <div
                                        className={`avatar w-10 avatar-${
                                            isOnline[index]
                                                ? "online"
                                                : "offline"
                                        }`}
                                    >
                                        <img
                                            className="size-10 rounded-full"
                                            src={
                                                user.profilePic
                                                    ? user.profilePic
                                                    : "/user.png"
                                            }
                                        />
                                    </div>
                                    <div>
                                        <div>{user.username}</div>
                                        <div className="text-xs uppercase font-semibold opacity-60">
                                            {user.mobileNumber}
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};
export default FriendsBar;
