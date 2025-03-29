import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate();
    const handleMoviesClick = () => {
        navigate('/movies')
    }
    const handleSeatsClick = () => {
        navigate('/seats')
    }

    const handleStaffClick = () => {
        navigate('/staff')
    }
    
    return (
        <div className="py-20 min-h-screen bg-gradient-to-br
        from-green-950 via-black to-black">
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
                        className="bg-gray-800 hover:bg-gray-900 p-4 rounded-lg
                        shadow-md hover:shadow-xl transition-all duration-200 ease-in-out transform hover:scale-105">
                            <div className="flex items-center justify-center">
                                    <span>
                                        🎥
                                    </span>
                            </div>
                            <p className="text-white mt-2">
                            Manages movie listings, showtimes, and screen
                            </p>
                        </button>

                        <button 
                        onClick={handleSeatsClick}
                        className="bg-gray-800 hover:bg-gray-900 p-4 rounded-lg
                        shadow-md hover:shadow-xl transition-all duration-200 ease-in-out transform hover:scale-105">
                            <div className="flex items-center justify-center">
                                    <span>
                                        💺
                                    </span>
                            </div>
                            <p className="text-white mt-2">
                            Manages seat bookings.
                            </p>
                        </button>
                        <button 
                        onClick={handleStaffClick}
                        className="bg-gray-800 hover:bg-gray-900 p-4 rounded-lg
                        shadow-md hover:shadow-xl transition-all duration-200 ease-in-out transform hover:scale-105">
                            <div className="flex items-center justify-center">
                                    <span>
                                        🤵
                                    </span>
                            </div>
                            <p className="text-white mt-2">
                            Manages staff, payroll, and their working hours..
                            </p>
                        </button>
                        <button 
                        onClick={handleStaffClick}
                        className="bg-gray-800 hover:bg-gray-900 p-4 rounded-lg
                        shadow-md hover:shadow-xl transition-all duration-200 ease-in-out transform hover:scale-105">
                            <div className="flex items-center justify-center">
                                    <span>
                                        🧹
                                    </span>
                            </div>
                            <p className="text-white mt-2">
                            Manages maintanance schedules and records.
                            </p>
                        </button>
                        <button 
                        onClick={handleStaffClick}
                        className="bg-gray-800 hover:bg-gray-900 p-4 rounded-lg
                        shadow-md hover:shadow-xl transition-all duration-200 ease-in-out transform hover:scale-105">
                            <div className="flex items-center justify-center">
                                    <span>
                                        👥
                                    </span>
                            </div>
                            <p className="text-white mt-2">
                            Manages customer details and their preferences.
                            </p>
                        </button>
                        <button 
                        onClick={handleStaffClick}
                        className="bg-gray-800 hover:bg-gray-900 p-4 rounded-lg
                        shadow-md hover:shadow-xl transition-all duration-200 ease-in-out transform hover:scale-105">
                            <div className="flex items-center justify-center">
                                    <span>
                                        📃
                                    </span>
                            </div>
                            <p className="text-white mt-2">
                            Generates reports on revenue and trends
                            </p>
                        </button>
                    </div>  
                </div>
            </div>
        </div>
    )
}

export default Dashboard 