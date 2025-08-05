import axios from "axios";
import { useEffect, useState } from "react"
import toast from "react-hot-toast";

const FriendsBar = () => {
    const [searchInput, setSearchInput] = useState("");
    const [searchedUser, setSearchedUser] = useState<any>([]);
    const [loading, setLoading] = useState(false);
    const [debouncedQuery, setDebouncedQuery] = useState("");

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

        </div>
    )
}
export default FriendsBar