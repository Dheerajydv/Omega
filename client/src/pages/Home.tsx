import { useState } from "react";
import { useAuth } from "../context/authContext";
import Navbar from "../components/Navbar";
import FriendsBar from "../components/FriendsBar";
import ChatBox from "../components/ChatBox";

const Home = () => {
    const { authUser } = useAuth();
    const [selectedUser, setSelectedUser] = useState(null);

    const handelUserSelect = (user: any) => {
        setSelectedUser(user);
    };

    const handleChatBack = () => {
        setSelectedUser(null);
    };
    return (
        <div className="h-screen w-screen flex flex-col">
            <Navbar />
            <div className="flex w-full h-11/12">
                <div className="card bg-base-300 rounded-box grid h-full w-1/4 grow place-items-center">
                    <FriendsBar onSelectUser={handelUserSelect} />
                </div>
                <div className="h-full w-3/4">
                    {selectedUser ? (
                        <ChatBox handleChatBack={handleChatBack} />
                    ) : (
                        <div className="hero h-full">
                            <div className="hero-content text-center">
                                <div className="max-w-md">
                                    <h1 className="mb-5 text-5xl font-bold">
                                        Hello! {authUser.data.username}
                                    </h1>
                                    <p className="mb-5">
                                        Why are lonely? When you can chat to
                                        someone.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
export default Home;
