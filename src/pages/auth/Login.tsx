// src/pages/LoginSignin/page.tsx
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginDialog = () => {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [role, setRole] = useState<"admin" | "user" | null>(null); // Start with null to show role selection
    const [formData, setFormData] = useState({ username: "",  password: ""});

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value});
    };

    const handleLogin = async () => {
        try {
            const { username, password} = formData;
            const res = await axios.post("http://localhost:5000/api/auth/login", {
                username, password});

            console.log("Logging response", res.data);
            const { token, role } = res.data;

            localStorage.setItem("token", token);
            localStorage.setItem("user", role);

            // Route based on role
            navigate(role === "admin" ? "/dashboard" : "/client-dashboard");
        } catch (error) {
            setError("Invalid username or password");
        }
    };


    return (
        <div>
            <h2 className="text-lg font-semibold text-gray-700">Welcome Back</h2>
            <p className="text-sm text-gray-500">Sign in to your account</p>
        
        {!role && (
            <div className="flex flex-col space-y-3 mb-4">
                <button 
                className="bg-gray-text-white px-4 py-2 rounded w-full"
                onClick={() => setRole("user")}
                >
                    Client
                </button>
                <button 
                className="bg-gray-800 text-white px-4 py-2 rounded w-full"
                onClick={() => setRole("admin")}
                >
                    Admin
                </button>
            </div>
        )}

        {role && (
            <>
                <input type="text" name="username" placeholder="Username" className="w-full p-2 border mb-2" onChange={handleInputChange}/>
                <input type="password" name="Password" placeholder="password" className="w-full p-2 border mb-2" onChange={handleInputChange}/>
            
                {error && <p className="text-red-500 text-sm">{error}</p>}

                <button 
                className="bg-green-600 text-white px-4 py-2 rounded w-full mt-4"
                onClick={handleLogin}
                >
                    Login
                </button>

                <button
                className="text-blue-500 text-sm mt-3"
                onClick={() => setRole(null)}
                >
                    Change Role
                </button>
            </>
        )}

        </div>
    )
}

export default LoginDialog