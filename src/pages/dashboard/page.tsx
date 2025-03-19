import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate();
    const handleMoviesClick = () => {
        navigate('/movies')
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-8">
                <div className="flex flex-col">
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
                        Dashboard
                    </h1>
                    <p className="text-lg text-gray-600 mt-3">
                        Manage your movies listings, seat management, and more.
                    </p>
                    {/* Dashboard grid*/}
                    <div className="mt-2 grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/*Movies Managment*/}
                        <button 
                        onClick={handleMoviesClick}
                        className="bg-blue-100 hover:bg-blue-200 p-4 rounded-lg
                        shadow-md hover:shadow-xl transition-all duration-200 ease-in-out transform hover:scale-105">
                            <div className="flex items-center justify-center">
                                    <span>
                                        🎥
                                    </span>
                            </div>
                            <p className="text-gray-900 mt-2">
                            Manages movie listings, showtimes, and screen
                            </p>
                        </button>
                    </div>  
                </div>
            </div>
        </div>
    )
}

export default Dashboard 