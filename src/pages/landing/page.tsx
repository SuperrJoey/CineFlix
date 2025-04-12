import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Clock, DollarSign, Film, Globe, Headphones, CreditCard } from "lucide-react";

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br
        from-green-950 via-black to-black">
            {/*Overlay for depth*/}
            <div className="absolute inset-0 bg-gradient-to-r from-green-950/20 to-black/20 pointer-events-none">
            </div>
            <div className="relative z-10 text-center px-4 flex flex-col items-center justify-center flex-grow py-10">
                <h1 className="text-8xl font-bold leading-tight bg-gradient-to-r from-white 
                via-white to-green-400 text-transparent bg-clip-text mt-28 mb-10">
                    CineFlix,
                    <br />
                    Your Local Cinema!
                </h1>

                <p className="text-2xl text-gray-300 max-w-2xl mx-auto mb-4">
                    Bringing Stories to Life, One Seat at a Time!
                </p>

                <div className="flex justify-center mb-20"> 
                <button 
                        className="px-8 py-3 text-lg rounded-xl bg-green-600 text-white hover:bg-white 
                        hover:text-black transition duration-300 ease-in-out flex items-center justify-center group"
                        onClick={() => navigate("/signin")}
                        >
                        <span className="flex items-center">
                            Get started
                            <ArrowRight 
                            className="ml-2 transition-transform duration-300
                            group-hover:translate-x-1 group-hover:scale-110"
                            size={24} // slightly bigger arrow
                            />
                        </span>
                        </button>

                </div>
                
                {/* Why Choose CineFlix Section */}
                <div className="w-full px-4 mb-24 py-10">
                    <h2 className="text-5xl font-bold mb-6 text-white">Why CineFlix?</h2>
                    <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-12">
                        Experience the ultimate cinema journey with premium features and unmatched comfort.
                        Discover why we're the preferred choice for movie enthusiasts.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Feature 1 */}
                        <div className="bg-zinc-900/80 rounded-lg p-6 flex flex-col items-start overflow-hidden relative">
                            <div className="flex flex-col items-start z-10">
                                <h3 className="text-3xl font-bold text-green-500 mb-1">Premium</h3>
                                <p className="text-white text-xl mb-0">Seating</p>
                            </div>
                            <Film className="absolute right-4 bottom-4 text-gray-700 opacity-20" size={100} />
                        </div>
                        
                        {/* Feature 2 */}
                        <div className="bg-zinc-900/80 rounded-lg p-6 flex flex-col items-start overflow-hidden relative">
                            <div className="flex flex-col items-start z-10">
                                <h3 className="text-3xl font-bold text-green-500 mb-1">Zero*</h3>
                                <p className="text-white text-xl mb-0">Booking Fees</p>
                            </div>
                            <DollarSign className="absolute right-4 bottom-4 text-gray-700 opacity-20" size={100} />
                        </div>
                        
                        {/* Feature 3 */}
                        <div className="bg-zinc-900/80 rounded-lg p-6 flex flex-col items-start overflow-hidden relative">
                            <div className="flex flex-col items-start z-10">
                                <h3 className="text-3xl font-bold text-green-500 mb-1">24/7</h3>
                                <p className="text-white text-xl mb-0">Support</p>
                            </div>
                            <Headphones className="absolute right-4 bottom-4 text-gray-700 opacity-20" size={100} />
                        </div>
                        
                        {/* Feature 4 */}
                        <div className="bg-zinc-900/80 rounded-lg p-6 flex flex-col items-start overflow-hidden relative">
                            <div className="flex flex-col items-start z-10">
                                <h3 className="text-3xl font-bold text-green-500 mb-1">300+</h3>
                                <p className="text-white text-xl mb-0">Movies Monthly</p>
                            </div>
                            <Globe className="absolute right-4 bottom-4 text-gray-700 opacity-20" size={100} />
                        </div>
                        
                        {/* Feature 5 */}
                        <div className="bg-zinc-900/80 rounded-lg p-6 flex flex-col items-start overflow-hidden relative">
                            <div className="flex flex-col items-start z-10">
                                <h3 className="text-3xl font-bold text-green-500 mb-1">Instant</h3>
                                <p className="text-white text-xl mb-0">Ticket Booking</p>
                            </div>
                            <Clock className="absolute right-4 bottom-4 text-gray-700 opacity-20" size={100} />
                        </div>
                        
                        {/* Feature 6 */}
                        <div className="bg-zinc-900/80 rounded-lg p-6 flex flex-col items-start overflow-hidden relative">
                            <div className="flex flex-col items-start z-10">
                                <h3 className="text-3xl font-bold text-green-500 mb-1">Multiple</h3>
                                <p className="text-white text-xl mb-0">Payment Options</p>
                            </div>
                            <CreditCard className="absolute right-4 bottom-4 text-gray-700 opacity-20" size={100} />
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Feature Showcase Section at bottom */}
            <div className="absolute bottom-0 w-full bg-zinc-900/80 backdrop-blur-sm py-6 mt-10">
                <div className="container mx-auto grid grid-cols-4 divide-x divide-green-800/30">
                    <div className="px-6 text-center">
                        <h3 className="text-3xl font-bold text-white">300+</h3>
                        <p className="text-gray-400">movie screenings</p>
                    </div>
                    
                    <div className="px-6 text-center">
                        <h3 className="text-3xl font-bold text-white">24/7</h3>
                        <p className="text-gray-400">dedicated support</p>
                    </div>
                    
                    <div className="px-6 text-center">
                        <h3 className="text-3xl font-bold text-white">Instant</h3>
                        <p className="text-gray-400">ticket reservations</p>
                    </div>
                    
                    <div className="px-6 text-center">
                        <h3 className="text-3xl font-bold text-white">Fast. Precise.</h3>
                        <p className="text-gray-400">service delivery</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;