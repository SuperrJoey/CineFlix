// src/pages/auth/Register.tsx
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ 
    fullName: "", 
    username: "", 
    password: "",
    role: "user" 
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { fullName, username, password, role } = formData;
      
      const response = await axios.post("http://localhost:5000/api/auth/signup", {
        name: fullName,
        username,
        password,
        role
      });

      // Store user role for future use
      localStorage.setItem("user", role);
      
      // Navigate based on role
      navigate(role === "admin" ? "/dashboard" : "/client-dashboard");
    } catch (error: any) {
      setError(error.response?.data?.message || "Signup failed. Please try again.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSignup}>
        <div className="mb-4">
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            placeholder="Full Name"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            onChange={handleInputChange}
            required
          />
        </div>

        {/* <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Role <span className="text-red-500">*</span>
          </label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          >
            <option value="">Select a role</option>
            <option value="user">Client</option>
            <option value="admin">Admin</option>
          </select>

        </div> */}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Username <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              onChange={handleInputChange}
              required
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}

<div className="flex flex-col justify-center items-center">
        <button
          type="submit"
          className="px-6 inline-block bg-green-500 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
        >
          Create an account
        </button>
        </div>
        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            Already have an account? <a href="/signin" className="text-green-600 hover:underline">Sign in</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;