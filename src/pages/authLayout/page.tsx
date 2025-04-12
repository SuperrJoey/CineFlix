// src/pages/authLayout/page.tsx
import { Link, useLocation, Outlet } from "react-router-dom";
import { motion } from "framer-motion";

const AuthLayout = () => {
  const location = useLocation();
  const isSignin = location.pathname === "/signin";

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-green-950 via-black to-black flex items-center justify-center p-4">
      <motion.div
        className="w-full max-w-md bg-white rounded-lg shadow-xl"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Logo */}
        <div className="text-center pt-8">
          <h1 className="text-3xl font-bold text-green-600">CineFlix</h1>
        </div>

        {/* Auth card */}
        <div className="rounded-xl shadow-md p-8">
          <div className="flex mb-8">
            <Link
              to="/signin"
              className={`flex-1 py-3 text-center border-b-2 ${
                isSignin
                  ? "border-green-600 text-green-600 font-medium"
                  : "border-transparent text-gray-500"
              }`}
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className={`flex-1 py-3 text-center border-b-2 ${
                !isSignin
                  ? "border-green-600 text-green-600 font-medium"
                  : "border-transparent text-gray-500"
              }`}
            >
              Create an account
            </Link>
          </div>

          {/* Welcome text */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-green-600 text-center">
              {isSignin ? "Welcome back!" : "Welcome"}
            </h2>
            <p className="text-gray-600 mt-1 text-center">
              {isSignin ? "" : "Create an account to get started"}
            </p>
          </div>

          {/* Auth form content */}
          <Outlet />
        </div>
      </motion.div>
    </div>
  );
};

export default AuthLayout;
