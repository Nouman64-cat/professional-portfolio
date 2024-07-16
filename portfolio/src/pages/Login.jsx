import { useState } from "react"
import axios from "axios";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.get("/");
    }
  return (
    <div className="min-h-screen w-full flex flex-col content-center items-center justify-center">
        <div className="w-full max-w-screen-lg px-4">
            <h1 className="text-3xl text-primary font-montserrat font-bold mb-5 text-center">Login</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-center">
                <input
                    className="w-[50%] border-primary-Primary border-2 p-4 rounded-full"
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={handleEmailChange}
                />
                <input
                    className="w-[50%] border-primary-Primary border-2 p-4 rounded-full"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={handlePasswordChange}
                />
                <button
                    type="submit"
                    className="px-10 py-4 w-[50%] rounded-full text-white bg-primary hover:bg-slate-700"
                >
                    Login
                </button>
            </form>
        </div>
    </div>
  )
}

export default Login