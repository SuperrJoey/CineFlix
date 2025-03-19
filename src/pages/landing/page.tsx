import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    
    const handleDashboardClick = () => {
        setIsLoading(true);
        setTimeout(() => {
            navigate('/dashboard');
        }, 700);
    };
    
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 text-white
        flex flex-col items-center justify-center">
            <div className="text-center">
                <h1 className="text-5xl font-bold text-gray-800 mb-6">
                    Welcome to the CineFlix!
                </h1>
                <p className="text-gray-600 px-4">
                    Manage your theatre operations, scheduling, seat management and much more.
                </p>
                <button 
                onClick={handleDashboardClick}
                disabled={isLoading}
                className={`inline-flex items-center justify-center bg-gray-800
                text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-700 
                transition-colors shadow-lg hover:shadow-xl mt-6 ${isLoading ? 'opacity-70 cursor-not-allowed': ""}`}>
                {isLoading ? (<div className="flex items-center">
                    <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full
                    animate-spin mr-2"></div>
                    Loading...
                </div>) : (
                    "Go to dashboard"
                )}
                </button>
            </div>
        </div>
    )
}

export default Home;