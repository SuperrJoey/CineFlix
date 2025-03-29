import { useNavigate, useLocation } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const userRole = localStorage.getItem('user');
    
    const isActive = (path: string) => location.pathname === path;
    
    return (
        <header className="py-4 px-6 bg-transparent absolute w-full">
            <div className="container mx-auto flex items-center justify-between">
                {/* Logo on left */}
                <button 
                    onClick={() =>   navigate('/dashboard')}
                    className="text-white text-xl font-extrabold"
                >
                    CineFlix
                </button>
                
                {/* Navigation in center with rounded black background */}
                <div className="bg-black rounded-full py-3 px-8 shadow-lg">
                    <nav className="flex space-x-8">
                        <button
                            className={`transition-all ${isActive('/movies') ? 'text-white font-bold' : 'text-gray-300 hover:text-white'}`}
                            onClick={() => navigate('/movies')}
                        >
                            Movies
                        </button>
                        <button
                            className={`transition-all ${isActive('/seats') ? 'text-white font-bold' : 'text-gray-300 hover:text-white'}`}
                            onClick={() => navigate('/seats')}
                        >
                            Seats
                        </button>
                        {userRole === 'admin' && (
                            <>
                                <button
                                    className={`transition-all ${isActive('/staff') ? 'text-white font-bold' : 'text-gray-300 hover:text-white'}`}
                                    onClick={() => navigate('/staff')}
                                >
                                    Staff
                                </button>
                                <button
                                    className={`transition-all ${isActive('/maintenance') ? 'text-white font-bold' : 'text-gray-300 hover:text-white'}`}
                                    onClick={() => navigate('/maintenance')}
                                >
                                    Maintenance
                                </button>
                                <button
                                    className={`transition-all ${isActive('/customer') ? 'text-white font-bold' : 'text-gray-300 hover:text-white'}`}
                                    onClick={() => navigate('/customer')}
                                >
                                    Customer
                                </button>
                                <button
                                    className={`transition-all ${isActive('/report') ? 'text-white font-bold' : 'text-gray-300 hover:text-white'}`}
                                    onClick={() => navigate('/report')}
                                >
                                    Report
                                </button>
                            </>
                        )}
                    </nav>
                </div>
                
                {/* Logout on right */}
                <button
                    className="text-white px-6 py-2 hover:text-white hover:bg-green-800 transition-all rounded-2xl border border-white-400"
                    onClick={() => {
                        localStorage.removeItem('token');
                        localStorage.removeItem('user');
                        navigate('/signin');
                    }}
                >
                    Logout
                </button>
            </div>
        </header>
    );
}

export default Header;