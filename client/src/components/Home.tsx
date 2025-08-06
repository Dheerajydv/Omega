import { useState } from "react";
import { useAuth } from "../context/authContext"
import ChatBox from "./ChatBox";
import FriendsBar from "./FriendsBar";

const Home = () => {
    const { authUser } = useAuth();
    const [selectedUser, setSelectedUser] = useState(null);

    const handelUserSelect = (user: any) => {
        setSelectedUser(user);
    }
    return (
        <div className="flex w-full">
            <div className="card bg-base-300 rounded-box grid h-20 grow place-items-center">
                <FriendsBar onSelectUser={handelUserSelect} />
            </div>
            <div className="divider divider-horizontal">OR</div>
            <div className="card bg-base-300 rounded-box grid h-20 grow place-items-center">
                {selectedUser ? <ChatBox /> : <h1>Let's Chat to Someone as {authUser.data.username}</h1>}

            </div>
        </div>
    )
}
export default Home