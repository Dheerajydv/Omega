import { useAuth } from "../context/authContext"
import ChatBox from "./ChatBox";
import FriendsBar from "./FriendsBar";

const Home = () => {
    const { authUser } = useAuth();
    return (
        <div className="flex w-full">
            <div className="card bg-base-300 rounded-box grid h-20 grow place-items-center">
                <FriendsBar />
            </div>
            <div className="divider divider-horizontal">OR</div>
            <div className="card bg-base-300 rounded-box grid h-20 grow place-items-center">
                <ChatBox />
            </div>
        </div>
    )
}
export default Home