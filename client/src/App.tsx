import { Route, Routes } from "react-router-dom"
import LoginForm from "./components/LoginForm"
import RegisterForm from "./components/RegisterForm"

const App = () => {
  return (
    <>
      <div className="p-2 w-screen h-screen flex flex-col items-center justify-center">
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
        </Routes>
      </div>

    </>
  )
}
export default App