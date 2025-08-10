import { ArrowLeft } from "lucide-react";
import userChats from "../zustands/useChats";

export interface ChatTopBarProps {
    handleChatBack: any;
}

const ChatTopBar = ({ handleChatBack }: ChatTopBarProps) => {
    const { selectedChat } = userChats();

    return (
        <div
            onClick={handleChatBack}
            className="navbar bg-primary h-1/12 text-primary-content"
        >
            <button className="btn btn-ghost mr-2">
                <ArrowLeft />
            </button>
            <div className="avatar flex justify-center items-center">
                <div className="ring-primary mr-2 ring-offset-base-100 w-10 rounded-full ring-2 ring-offset-2">
                    <img
                        className="h-10"
                        src={
                            selectedChat.profilePic
                                ? selectedChat.profilePic
                                : "/user.png"
                        }
                        alt="Profile Picture"
                    />
                </div>
                <h1 className="text-xl mr-4">{selectedChat.username}</h1>
            </div>
        </div>
    );
};
export default ChatTopBar;
