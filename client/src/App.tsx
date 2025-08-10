import { Route, Routes } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import { VerifyUser } from "./utils/VerifyUser";
import Profile from "./pages/Profile";
import Home from "./pages/Home";

const App = () => {
    return (
        <>
            <div className="p-2 w-screen max-h-screen flex flex-col items-center justify-center">
                <Routes>
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/register" element={<RegisterForm />} />
                    <Route element={<VerifyUser />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/profile" element={<Profile />} />
                    </Route>
                </Routes>
            </div>
        </>
    );
};
export default App;
