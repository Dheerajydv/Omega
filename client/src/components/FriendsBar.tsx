import axios from "axios";
import { useEffect, useState } from "react"
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import userChats from "../zustands/useChats";
import { useSocketContext } from "../context/socketContext";
import { useAuth } from "../context/authContext";

const FriendsBar = ({ onSelectUser }: any) => {
    const [searchInput, setSearchInput] = useState("");
    const [searchedUser, setSearchedUser] = useState<any>([]);
    const [loading, setLoading] = useState(false);
    const [debouncedQuery, setDebouncedQuery] = useState("");
    const [chatUser, setChatUser] = useState<any>([]);
    const [selectedUserId, setSetSelectedUserId] = useState(null);
    const { setSelectedChat, messages, } = userChats();
    const { onlineUsers, socket } = useSocketContext();
    const [newMessageUsers, setNewMessageUsers] = useState('');
    const navigate = useNavigate();
    const { authUser } = useAuth();
    const nowOnline = chatUser.map((user: any) => (user._id));
    const isOnline = nowOnline.map((userId: any) => onlineUsers.includes(userId));

    useEffect(() => {
        socket?.on("newMessage", (newMessage: any) => {
            setNewMessageUsers(newMessage)
        })
        return () => {
            socket?.off("newMessage");
        };

    }, [socket, messages]);

    const fetchSearchResult = async (debouncedQuery: string) => {
        try {
            const response = await axios.get(`/api/users/search?search=${debouncedQuery}`);
            setSearchedUser(response.data.data);

        } catch (error: any) {
            console.log(error)
            toast.error(error.response.data.error.message);
        } finally {
            setLoading(false);
        }
    };

    const chatUserHandler = async () => {
        setLoading(true)
        try {
            const response = await axios.get(`/api/users/current-chatter`)
            // console.log(response.data)
            setChatUser(response.data.data)

        } catch (error: any) {
            console.log(error.response.data.error.message);
            toast.error(error.response.data.error.message)
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

    // back from search result
    const handSearchback = () => {
        setSearchedUser([]);
    };

    useEffect(() => {
        chatUserHandler()
    }, []);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedQuery(searchInput); // update after delay
        }, 500); // 500ms debounce time

        return () => {
            clearTimeout(handler); // clear previous timer
        };
    }, [searchInput]);

    useEffect(() => {
        if (debouncedQuery) {
            // Make API call here with debouncedQuery
            console.log("Searching for:", debouncedQuery);
            fetchSearchResult(debouncedQuery)
        }
    }, [debouncedQuery]);

    return (
        <div className="w-full flex flex-col justify-start mt-4 h-full items-center">
            {/* Search bar section */}
            <div className="flex justify-center items-center">
                <label className="input">
                    <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            strokeWidth="2.5"
                            fill="none"
                            stroke="currentColor"
                        >
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="m21 21-4.3-4.3"></path>
                        </g>
                    </svg>
                    <input type="search" onChange={(e) => setSearchInput(e.target.value)} required placeholder="Search" />
                </label>
                <div onClick={() => navigate(`/profile`)} className="avatar">
                    <div className="ring-primary ring-offset-base-100 w-10 rounded-full ring-2 ring-offset-2">
                        <img src={authUser.data.profilePic ? authUser.data.profilePic : "../../public/user.png"} alt="Profile Picture" />
                    </div>
                </div>
            </div>
            {/* search section */}
            <div>
                <div className={`dropdown dropdown-${searchedUser.length === 0 ? "close" : "open"}`} >
                    <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-10 w-52 p-2 shadow-sm">
                        {
                            searchedUser.map((user: any) => (
                                <li key={user.mobileNumber} >
                                    <a onClick={() => handleUserClick(user)} key={user._id}>{user.username}</a>
                                </li>
                            ))
                        }
                        <button onClick={handSearchback}>{"<-"}</button>
                    </ul>
                </div>
            </div>

            {/* All friends section */}
            {
                loading ? <span className="loading loading-spinner text-primary"></span> :
                    <div className="w-full">
                        <ul className="list bg-base-100 rounded-box shadow-md overflow-scroll">
                            {
                                chatUser.map((user: any, index: any) => (
                                    <div
                                        key={user._id}
                                        className={`card card-border w-96 ${user._id == selectedUserId ? "bg-base-100" : "bg-base-300"} `}
                                    >
                                        <div onClick={() => handleUserClick(user)} className="card-body flex ">
                                            <div className={`avatar avatar-${isOnline[index] ? 'online' : 'offline'}`}>
                                                <div className="w-10 rounded-full">
                                                    <img src={user.profilePic ? user.profilePic : "../../public/user.png"} />
                                                </div>
                                            </div>
                                            <h2 className="card-title">{user.username}</h2>
                                        </div>
                                    </div>
                                ))
                            }
                        </ul>
                    </div>
            }
        </div >
    )
}
export default FriendsBar