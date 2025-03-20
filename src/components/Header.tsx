import { useNavigate, useLocation } from "react-router-dom";

const Header = () => {

    const navigate = useNavigate();
    const location = useLocation();
    
    const isActive = (path: string) => location.pathname === path;
    
    return (
        <header className="bg-gray-100 text-white shadow-md py-6 px-6">
            <div className="container mx-auto flex justify-between items-center">
                <button 
                onClick={() => navigate('/')}
                className="text-gray-800">CineFlix</button>
                <nav className="flex justify-between space-x-3">
                    <button
                    className={`rounded-lg  px-4  transition-all 
                        ${isActive('/movies') ? 'bg-gray-700 hover:text-white font-bold' :
                            'text-gray-800 hover:bg-gray-700 hover:text-white'
                        }
                    `}
                        onClick={() => navigate('/movies')}
                    >
                        Movies
                    </button>
                    <button
                        className={`rounded-lg  px-4  transition-all 
                            ${isActive('/seats') ? 'bg-gray-700 hover:text-white font-bold' :
                                'text-gray-800 hover:bg-gray-700 hover:text-white'
                            }
                        `}
                        onClick={() => navigate('/seats')}
                    >
                        Seats
                    </button>
                    <button
                        className={`rounded-lg  px-4  transition-all 
                            ${isActive('/staff') ? 'bg-gray-700 hover:text-white font-bold' :
                                'text-gray-800 hover:bg-gray-700 hover:text-white'
                            }
                        `}
                        onClick={() => navigate('/staff')}
                    >
                        Staff
                    </button>
                    <button
                        className={`rounded-lg  px-4  transition-all 
                            ${isActive('/Maintenance') ? 'bg-gray-700 hover:text-white font-bold' :
                                'text-gray-800 hover:bg-gray-700 hover:text-white'
                            }
                        `}
                        onClick={() => navigate('/maintenance')}
                    >
                        Maintenance
                    </button>
                    <button
                        className={`rounded-lg  px-4  transition-all 
                            ${isActive('/customer') ? 'bg-gray-700 hover:text-white font-bold' :
                                'text-gray-800 hover:bg-gray-700 hover:text-white'
                            }
                        `}
                        onClick={() => navigate('/customer')}
                    >
                        Customer
                    </button>
                    <button
                        className={`rounded-lg  px-4  transition-all 
                            ${isActive('/report') ? 'bg-gray-700 hover:text-white font-bold' :
                                'text-gray-800 hover:bg-gray-700 hover:text-white'
                            }
                        `}
                        onClick={() => navigate('/report')}
                    >
                        Report
                    </button>
                </nav>
            </div>
        </header>
    )
}

export default Header;