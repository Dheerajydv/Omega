import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ThemeController from "./ThemeController";

const Navbar = () => {
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            const response = await axios.post("/api/auth/logout");
            console.log(response.data.message);
            toast.success(response.data.message);
            navigate("/login");
        } catch (error: any) {
            console.log(error);
            toast.error(error.response.data.error.message);
        }
    };
    return (
        <div className="navbar bg-primar flex justify-between text-primary-content">
            <button className="btn btn-ghost text-xl">OMEGA</button>
            <ThemeController />
            <button onClick={handleLogout} className="btn btn-error">
                Logout
            </button>
            <Toaster position="bottom-right" />
        </div>
    );
};
export default Navbar;
