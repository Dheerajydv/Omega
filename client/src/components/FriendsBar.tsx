import axios from "axios";
import { useEffect, useState } from "react"
import toast from "react-hot-toast";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import userChats from "../zustands/useChats";
import { useSocketContext } from "../context/socketContext";

const FriendsBar = ({ onSelectUser }: any) => {
    const [searchInput, setSearchInput] = useState("");
    const [searchedUser, setSearchedUser] = useState<any>([]);
    const [loading, setLoading] = useState(false);
    const [debouncedQuery, setDebouncedQuery] = useState("");
    const [chatUser, setChatUser] = useState<any>([]);
    const [selectedUserId, setSetSelectedUserId] = useState(null);
    const { selectedChat, setSelectedChat, messages, setMessages } = userChats();
    const { onlineUsers, socket } = useSocketContext();
    const [newMessageUsers, setNewMessageUsers] = useState('');

    const { authUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        socket?.on("newMessage", (newMessage: any) => {
            setNewMessageUsers(newMessage)
        })
        return () => {
            socket?.off("newMessage");
        };

    }, [socket, messages])

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
    }

    const chatUserHandler = async () => {
        setLoading(true)
        try {
            const response = await axios.get(`/api/users/current-chatter`)
            // console.log(response.data)
            setChatUser(response.data.data)

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    //show which user is selected
    const handleUserClick = (user: any) => {
        onSelectUser(user);
        setSelectedChat(user);
        setSetSelectedUserId(user._id);
    }

    //back from search result
    // const handSearchback = () => {
    //     setSearchedUser([]);

    // }

    useEffect(() => {
        chatUserHandler()
    }, [])

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
        <div>
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
                <div onClick={() => navigate(`/profile/${authUser?.data._id}`)} className="avatar avatar-placeholder">
                    <div className="bg-neutral text-neutral-content w-10 rounded-full">
                        <span className="text-xl">P</span>
                    </div>
                </div>
            </div>
            <>
                {loading ? <span className="loading loading-spinner text-primary"></span> :
                    <>
                        <div>
                            <div className="dropdown dropdown-open">
                                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                                    {searchedUser.length === 0 ? null : searchedUser.map((user: any) => (
                                        <li key={user.mobileNumber} className="list-row">
                                            <div>
                                                <img className="size-10 rounded-box" src="https://img.daisyui.com/images/profile/demo/1@94.webp" />
                                            </div>
                                            <div>
                                                <div key={user._id}>{user.username}</div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div>
                            <ul className="list bg-base-100 rounded-box shadow-md overflow-scroll">
                                {chatUser.map((user: any) => (
                                    <li key={user._id} className="list-row" onClick={() => handleUserClick(user)}>
                                        <div><img className="size-10 rounded-box" src="https://img.daisyui.com/images/profile/demo/1@94.webp" /></div>
                                        <div>
                                            <div key={user._id}>{user.username}</div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </>
                }
            </>
        </div>
    )
}
export default FriendsBar