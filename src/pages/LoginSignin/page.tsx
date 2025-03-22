// src/pages/LoginSignin/page.tsx
import { useState } from "react";
import axios from "axios";

interface LoginDialogProps {
    onClose: () => void;
    navigate: (path: string) => void;
}

const LoginDialog = ({ onClose, navigate }: LoginDialogProps) => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [role, setRole] = useState<"admin" | "user" | null>(null); // Start with null to show role selection
    const [formData, setFormData] = useState({
        fullName: "",
        username: "",
        password: ""
    });

    const [error, setError] = useState("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value});
    };

    const handleLogin = async () => {
        try {
            const { username, password} = formData;
            const res = await axios.post("http://localhost:5000/api/auth/login", {
                username, password});
            const { token, role } = res.data;

            localStorage.setItem("token", token);
            localStorage.setItem("user", role);

            // Route based on role
            navigate(role === "admin" ? "/dashboard" : "/movies");
            onClose();
        } catch (error) {
            setError("Invalid username or password");
        }
    };

    const handleSignup = async () => {
        try {
            const {fullName, username, password} = formData;
            await axios.post("http://localhost:5000/api/auth/signup", {
                fullName, username, password, role: "client"
            });
            alert("Signup successful! please login");

            setIsSignUp(false);
        } catch (error) {
            setError("Signup failed. Please try again.");
        }
    }
  
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg text-gray-800 w-96 relative">
                <button
                className="absolute top-4 right-4 text-gray-500 cursor-pointer"
                onClick={onClose}
                >
                    <img src="/cross.svg" alt="close" className="w-6 h-6" />
                </button>
                
                <h2 className="text-xl font-semibold mb-4 text-center">
                    {isSignUp ? "Signup" : "Login"}
                </h2>

                {!isSignUp && role === null && (
                    <div className="flex flex-col space-y-3 mb-4">
                        <h3 className="text-center text-gray-700">Login as:</h3>
                        <button
                        className="bg-gray-800 text-white px-4 py-2 rounded w-full"
                        onClick={() => setRole("user")}>
                            Client
                        </button>
                        <button
                        className="bg-gray-800 text-white px-4 py-2 rounded w-full"
                        onClick={() => setRole("admin")}>
                            Admin
                        </button>
                    </div>
                )}

                {(role !== null || isSignUp) && (
                    <>
                    {isSignUp && (
                        <input 
                        type="text"
                        name="fullName"
                        placeholder="Full Name"
                        className="w-full p-2 border mb-2"
                        onChange={handleInputChange} 
                        />
                    )}
                        <input 
                        type="text"
                        name="username"
                        placeholder="Username"
                        className="w-full p-2 border mb-2"
                        onChange={handleInputChange}
                        />

                        <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="w-full p-2 border mb-2"
                        onChange={handleInputChange}
                        />
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    
                    <button 
                    className="bg-gray-800 text-white px-4 py-3 w-full mt-2 rounded-md hover:bg-gray-600"
                    onClick={isSignUp ? handleSignup : handleLogin}
                    >
                    {isSignUp ? "Sign Up" : "Login"}
                    </button>
                    
                    {!isSignUp && (
                        <div className="mt-3 flex justify-between items-center">
                            {role === "user" && (
                                <p className="text-sm">Don't have an account?  
                                    <button 
                                    className="text-blue-500 ml-1"
                                    onClick={() => setIsSignUp(true)}
                                    >
                                        Sign Up
                                    </button>
                                </p>
                            )}
                            <button 
                                className="text-blue-500 text-sm"
                                onClick={() => setRole(null)}
                            >
                                Change Role
                            </button>
                        </div>
                    )}
                    </>
                )}
            </div>
        </div>
    )
}

export default LoginDialog