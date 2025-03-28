import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";


const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="relative flex items-center justify-center h-screen bg-gradient-to-br
        from-green-950 via-black to-black">
            {/*Overlay for depth*/}
            <div className="absolute inset-0 bg-gradient-to-r from-green-950/20 to-black/20 pointer-events-none">
            </div>
            <div className="relative z-10 text-center px-4">
                <h1 className="text-6xl font-bold mb-4 leading-tight bg-gradient-to-r from-white 
                via-white to-green-400 text-transparent bg-clip-text">
                    CineFlix,
                    <br />
                    Your Local Cinema!
                </h1>

                <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-4">
                    Bringing Stories to Life, One Seat at a Time!
                </p>

                <div className="flex justify-center"> 
                <button 
                className="px-6 py-2 rounded-lg bg-green-600 text-white hover:bg-white 
                hover:text-black transition duration-300 ease-in-out flex items-center justify-center group"
                onClick={() => navigate("/signin")}
                >
                    <span className="flex items-center">
                    Get started
                    <ArrowRight 
                        className="ml-2 transition-transform duration-300
                        group-hover:translate-x-1 group-hover:scale-110"
                        size={20}
                    />

                    </span>
                </button>
                </div>
            </div>
        </div>
    )

}

export default Home;