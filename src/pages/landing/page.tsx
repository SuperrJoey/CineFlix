import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginDialog from "../LoginSignin/page";

const Home = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);

    
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
                onClick={() => setDialogOpen(true)}
                disabled={isLoading}
                className="inline-flex items-center justify-center bg-gray-800
                text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-700 
                transition-colors shadow-lg hover:shadow-xl mt-6">
                        Sign in
                </button>
            </div>
            {dialogOpen && <LoginDialog onClose={() => setDialogOpen(false)} navigate={navigate}/>}
        </div>
    )
}

export default Home;