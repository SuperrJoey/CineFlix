import { useState } from "react"
import axios from "axios"

const Register = () => {
    const [formData, setFormData] = useState({ fullName: "", username: "", password: ""});
    const [error, setError] = useState("");

    const handleInputChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSignup = async () => {
        try {
            const { fullName, username, password } = formData;
            await axios.post("http://localhost:5000/api/auth/signup", {
                fullName, username, password, role: "user"
            });
            alert("Signup successful! please login");            
        } catch (error) {
            setError("Signup failed. Please try again.");
        }
    };

  return (
    <div className="mt-6">
        <h2 className="text-lg font-semibold text-gray-700">
            Create an Account
        </h2>
        <p className="text-sm text-gray-500">Sign up for a new account</p>

        <input type="text" name="fullName" placeholder="Full Name" className="w-full p-2 border mb-2" onChange={handleInputChange}/>
        <input type="text" name="username" placeholder="Username" className="w-full p-2 border mb-2" onChange={handleInputChange}/>
        <input type="text" name="password" placeholder="Password" className="w-full p-2 border mb-2" onCanPlay={handleInputChange}/>
    
        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button 
        className="bg-green-600 text-white px-4 py-2 rounded w-full mt-4"
        onClick={handleSignup}
        >
            Sign Up
        </button>

    </div>
  )
}

export default Register
