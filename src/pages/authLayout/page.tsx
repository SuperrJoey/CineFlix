import { Link, useLocation, Outlet } from "react-router-dom"

const authLayout = () => {
    const location = useLocation();
    const isSignin = location.pathname === "/signin";

  return (
    <div className='flex justify-center items-center h-screen bg-gray-900'>
        <div className='w-96 bg-white p-8 rounded-xl shadow-lg'>
            <h1 className='text-center text-3xl font-bold text-green-600'>
                CineFlix
            </h1>
            <div className='flex justify-between mt-6 border-b pb-2'>
                <Link 
                to="/signin"
                className={`text-lg font-semibold ${isSignin ? "text-green-600 border-b-2 border-green-600" : "text-gray-500"}`}
                >
                    Sign In
                </Link>
                <Link
                    to="/register"
                    className={`text-lg font-semibold ${!isSignin ? "text-green-600 border-b-2 border-green-600" : "text-gray-500"}`}
                >
                    Create an account
                </Link>
            </div>
            <Outlet />
        </div>
    </div>
  )
}

export default authLayout