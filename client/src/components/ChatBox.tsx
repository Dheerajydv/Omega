import SendMessage from "./SendMessage";
import Chats from "./Chats";
import ChatTopBar from "./ChatTopBar";

export interface ChatBoxProps {
    handleChatBack: any;
}

const ChatBox = ({ handleChatBack }: ChatBoxProps) => {
    return (
        <div className="w-full h-full flex flex-col items-center justify-between">
            <ChatTopBar handleChatBack={handleChatBack} />
            <Chats />
            <SendMessage />
        </div>
    );
};
export default ChatBox;
