import { useState } from "react";
import { useAuth } from "../context/authContext"
import ChatBox from "./ChatBox";
import FriendsBar from "./FriendsBar";
import Navbar from "./Navbar";

const Home = () => {
    const { authUser } = useAuth();
    const [selectedUser, setSelectedUser] = useState(null);

    const handelUserSelect = (user: any) => {
        setSelectedUser(user);
    }

    const handleChatBack = () => {
        setSelectedUser(null)
    }
    return (
        <div className="h-screen w-screen flex flex-col m-0">
            <Navbar />
            <div className="flex w-full h-screen">
                <div className="card bg-base-300 rounded-box grid h-full w-1/4 grow place-items-center">
                    <FriendsBar onSelectUser={handelUserSelect} />
                </div>
                <div className="card bg-base-300 rounded-box w-3/4 grid h-full grow overflow-scroll place-items-start">
                    {selectedUser ? <ChatBox handleChatBack={handleChatBack} /> : <div
                        className="hero min-h-screen"
                        style={{
                            backgroundImage:
                                "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
                        }}
                    >
                        <div className="hero-overlay"></div>
                        <div className="hero-content text-neutral-content text-center">
                            <div className="max-w-md">
                                <h1 className="mb-5 text-5xl font-bold">Hello! {authUser.data.username}</h1>
                                <p className="mb-5">
                                    Why are lonely? When you can chat to someone.
                                </p>
                            </div>
                        </div>
                    </div>}
                </div>
            </div>
        </div>
    )
}
export default Home