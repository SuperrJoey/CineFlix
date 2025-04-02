// src/pages/auth/Login.tsx
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({ username: "", password: "", role: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { username, password } = formData;
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        username, 
        password
      });

      const { token, role, name } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", role);
      localStorage.setItem("Name", name);

      // Route based on role
      navigate(role === "admin" ? "/dashboard" : "/client-dashboard");
    } catch (error) {
      setError("Invalid email or password");
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
      <div className="mb-4">
          <label htmlFor="role" className="block text-sm font-medium text-black mb-1">
            Select Role <span className="text-red-500">*</span>
          </label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 bg-white-800 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="client">Client</option>
            <option value="admin">Admin</option>
          </select>
        </div>


        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
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

        <div className="mb-4">
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

        <div className="mb-6 text-right">
          <a href="#" className="text-sm text-green-600 hover:underline">
            I forgot my password?
          </a>
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
          Sign in
        </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            No account? <a href="/register" className="text-green-600 hover:underline">Create an account</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;