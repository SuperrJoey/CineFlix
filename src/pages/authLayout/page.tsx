// src/pages/authLayout/page.tsx
import { Link, useLocation, Outlet } from "react-router-dom";

const AuthLayout = () => {
  const location = useLocation();
  const isSignin = location.pathname === "/signin";

  return (
    <div className="flex min-h-screen bg-transparent">
      {/* Left side with image and branding */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br
        from-green-950 via-black to-black relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black"></div>
        
        {/* Brand logo */}
        <div className="absolute top-10 left-10 z-10">
          <h1 className="text-3xl font-bold text-white">CineFlix</h1>
        </div>
        
        {/* Coin/currency graphics like in the image */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4/5">
            {/* <img 
              src="/src/assets/cinema-coins.svg" 
              alt="Cinema illustration" 
              className="w-full"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "https://via.placeholder.com/500x300?text=Cinema+Experience";
              }}
            /> */}
          </div>
        </div>
        
        {/* Marketing caption */}
        <div className="absolute bottom-1/4 left-0 right-0 text-center">
          <h2 className="text-3xl font-bold text-white">Make Every Movie</h2>
          <h2 className="text-3xl font-bold text-white">Experience Count</h2>
        </div>
      </div>
      
      {/* Right side with auth form */}
      <div className="w-full md:w-1/2 flex justify-center items-center p-8 bg-black">
        <div className="w-full max-w-md bg-white rounded-lg">
          {/* Logo for mobile view */}
          <div className="md:hidden mb-8 text-center bg-transparent">
            <h1 className="text-3xl font-bold text-green-600">CineFlix</h1>
          </div>
          
          {/* Auth card */}
          <div className="rounded-xl shadow-md p-8">
            <h1 className="text-3xl font-bold text-center">CineFlix</h1>
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
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;