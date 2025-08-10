import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "lucide-react";
import Loader from "./Loader";

export interface SearchBarProps {
    handleUserClick: any;
}

const SearchBar = ({ handleUserClick }: SearchBarProps) => {
    const [searchInput, setSearchInput] = useState("");
    const [searchedUser, setSearchedUser] = useState<any>([]);
    const [loading, setLoading] = useState(false);
    const [debouncedQuery, setDebouncedQuery] = useState("");
    const { authUser } = useAuth();
    const navigate = useNavigate();

    const fetchSearchResult = async (debouncedQuery: string) => {
        setLoading(true);
        try {
            const response = await axios.get(
                `/api/users/search?search=${debouncedQuery}`
            );
            setSearchedUser(response.data.data);
        } catch (error: any) {
            console.log(error);
            toast.error(error.response.data.error.message);
        } finally {
            setLoading(false);
        }
    };

    // back from search result
    const handSearchback = () => {
        setSearchedUser([]);
    };

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
            fetchSearchResult(debouncedQuery);
        }
    }, [debouncedQuery]);

    return (
        <div className="flex flex-col items-center justify-around w-full">
            <div className="flex justify-between items-center">
                <label className="input w-5/6 mr-2">
                    <svg
                        className="h-[1em] opacity-50"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                    >
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
                    <input
                        type="search"
                        onChange={(e) => setSearchInput(e.target.value)}
                        required
                        placeholder="Search"
                    />
                </label>
                <div
                    onClick={() => navigate(`/profile`)}
                    className="avatar w-1/6 flex justify-center items-center"
                >
                    <div className="ring-primary ring-offset-base-100 w-10 rounded-full ring-2 ring-offset-2">
                        <img
                            src={
                                authUser.data.profilePic
                                    ? authUser.data.profilePic
                                    : "../../public/user.png"
                            }
                            alt="Profile Picture"
                        />
                    </div>
                </div>
            </div>
            <div>
                <ul className="list bg-base-100 rounded-box shadow-md mb-6">
                    {loading ? (
                        <Loader />
                    ) : (
                        searchedUser.map((user: any) => (
                            <li
                                key={user._id}
                                onClick={() => handleUserClick(user)}
                                className="list-row"
                            >
                                <div>
                                    <img
                                        className="size-10 rounded-full"
                                        src={
                                            user.profilePic
                                                ? user.profilePic
                                                : "../../public/user.png"
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
                        ))
                    )}
                    {searchedUser.length === 0 ? null : (
                        <button onClick={handSearchback}>
                            <ArrowLeftIcon />
                        </button>
                    )}
                </ul>
            </div>
        </div>
    );
};
export default SearchBar;
