import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useAuth } from "../context/authContext";
import Loader from "./Loader";

const loginFormSchema = z.object({
    mobileNumber: z.string().min(10, "Invlaid Mobile Number"),
    email: z.email("Invalid Email"),
    password: z.string(),
});

const LoginForm = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { setAuthUser } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<z.infer<typeof loginFormSchema>>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            mobileNumber: "",
            email: "",
            password: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof loginFormSchema>) => {
        setLoading(true);
        try {
            const response = await axios.post("/api/auth/login", { ...values });
            // console.log(response);
            toast.success(response.data.message);
            localStorage.setItem("chatapp", JSON.stringify(response.data));
            setAuthUser(response.data);
            navigate("/");
        } catch (error: any) {
            console.log(error);
            toast.error(error.response.data.error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <h1 className="text-2xl mb-4">LOGIN TO OMEGA</h1>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-4 mb-4 flex flex-col justify-center items-center"
                    >
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">
                                Phone Number
                            </legend>
                            <input
                                type="text"
                                placeholder="Phone Number"
                                className="input input-neutral"
                                {...register("mobileNumber")}
                            />
                            {errors?.mobileNumber && (
                                <p className="text-error">
                                    {errors.mobileNumber.message}
                                </p>
                            )}
                        </fieldset>

                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Email</legend>
                            <input
                                type="text"
                                placeholder="Email"
                                className="input input-neutral"
                                {...register("email")}
                            />
                            {errors?.email && (
                                <p className="text-error">
                                    {errors.email.message}
                                </p>
                            )}
                        </fieldset>

                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">
                                Password
                            </legend>
                            <input
                                type="password"
                                placeholder="Password"
                                className="input input-neutral"
                                {...register("password")}
                            />
                            {errors?.password && (
                                <p className="text-error">
                                    {errors.password.message}
                                </p>
                            )}
                        </fieldset>
                        <button className="btn btn-primary" type="submit">
                            Login
                        </button>
                    </form>
                    <p>
                        Don't Have an Account ?{" "}
                        <a href="/register">
                            <button className="text-primary">
                                Register Here
                            </button>
                        </a>
                    </p>
                    <Toaster position="bottom-right" />
                </>
            )}
        </>
    );
};
export default LoginForm;
