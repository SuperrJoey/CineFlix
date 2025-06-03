import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Clock, DollarSign, Film, Globe, Headphones, CreditCard, Star, Play, Ticket, Popcorn } from "lucide-react";

const Home = () => {
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(false);
    const [currentFeature, setCurrentFeature] = useState(0);
    const [typewriterText, setTypewriterText] = useState("");
    const [isTypingComplete, setIsTypingComplete] = useState(false);
    const [currentTagline, setCurrentTagline] = useState(0);
    const [taglineOpacity, setTaglineOpacity] = useState(1);

    const taglines = [
        "Where Every Story Comes Alive",
        "Your Premier Cinema Experience",
        "Bringing Magic to the Big Screen",
        "Where Movies Meet Memories"
    ];

    useEffect(() => {
        setIsVisible(true);
        
        // Auto-rotate features
        const featureInterval = setInterval(() => {
            setCurrentFeature(prev => (prev + 1) % 6);
        }, 3000);

        // Enhanced Typewriter effect for main title
        const titleText = "CineFlix";
        let i = 0;
        
        // Start typing after a small delay
        const typewriterTimeout = setTimeout(() => {
            const typewriterInterval = setInterval(() => {
                if (i < titleText.length) {
                    setTypewriterText(titleText.slice(0, i + 1));
                    i++;
                } else {
                    setIsTypingComplete(true);
                    clearInterval(typewriterInterval);
                }
            }, 120); // Smoother timing (was 150ms)
        }, 800); // Initial delay before typing starts

        // Smooth rotating taglines with fade effect
        const taglineInterval = setInterval(() => {
            setTaglineOpacity(0); // Fade out
            setTimeout(() => {
                setCurrentTagline(prev => (prev + 1) % taglines.length);
                setTaglineOpacity(1); // Fade in
            }, 500); // Wait for fade out to complete
        }, 4000);

        return () => {
            clearInterval(featureInterval);
            clearInterval(taglineInterval);
            clearTimeout(typewriterTimeout);
        };
    }, []);

    const features = [
        { icon: Film, title: "Premium", subtitle: "Seating", description: "Luxury reclining seats with premium comfort" },
        { icon: DollarSign, title: "Zero*", subtitle: "Booking Fees", description: "No hidden charges, transparent pricing" },
        { icon: Headphones, title: "24/7", subtitle: "Support", description: "Round-the-clock customer assistance" },
        { icon: Globe, title: "300+", subtitle: "Movies Monthly", description: "Vast collection of latest and classic films" },
        { icon: Clock, title: "Instant", subtitle: "Ticket Booking", description: "Book your seats in seconds" },
        { icon: CreditCard, title: "Multiple", subtitle: "Payment Options", description: "Flexible payment methods for your convenience" },
    ];

    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-950 via-black to-black overflow-hidden">
            {/* Rich Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Cinematic Light Beams */}
                <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-green-400/20 via-green-500/5 to-transparent transform rotate-12 opacity-60">
                    <div className="w-full h-full animate-pulse" style={{ animationDuration: '4s', animationDelay: '0s' }} />
                </div>
                <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-green-300/15 via-green-400/3 to-transparent transform -rotate-6 opacity-40">
                    <div className="w-full h-full animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }} />
                </div>
                <div className="absolute top-0 left-2/3 w-px h-full bg-gradient-to-b from-green-500/10 via-green-300/3 to-transparent transform rotate-3 opacity-30">
                    <div className="w-full h-full animate-pulse" style={{ animationDuration: '8s', animationDelay: '4s' }} />
                </div>

                {/* Additional Cinema Elements */}
                <div className="absolute top-20 left-16 opacity-30">
                    <Film 
                        className="text-green-400/40 transform-gpu"
                        size={24}
                        style={{
                            animation: 'smoothFloat 8s ease-in-out infinite, rotateGentle 12s linear infinite'
                        }}
                    />
                </div>
                
                <div className="absolute top-32 right-20 opacity-25">
                    <Ticket 
                        className="text-green-300/50 transform-gpu"
                        size={20}
                        style={{
                            animation: 'smoothFloat 10s ease-in-out infinite reverse, fadeInOut 6s ease-in-out infinite'
                        }}
                    />
                </div>

                <div className="absolute bottom-40 left-24 opacity-35">
                    <Popcorn 
                        className="text-green-500/40 transform-gpu"
                        size={18}
                        style={{
                            animation: 'smoothFloat 7s ease-in-out infinite, scaleGentle 4s ease-in-out infinite'
                        }}
                    />
                </div>

                <div className="absolute top-1/3 right-1/4 opacity-25">
                    <Clock 
                        className="text-green-400/35 transform-gpu"
                        size={16}
                        style={{
                            animation: 'smoothFloat 9s ease-in-out infinite, rotateGentle 15s linear infinite reverse'
                        }}
                    />
                </div>

                <div className="absolute bottom-1/3 right-16 opacity-30">
                    <Globe 
                        className="text-green-300/45 transform-gpu"
                        size={22}
                        style={{
                            animation: 'smoothFloat 11s ease-in-out infinite reverse, scaleGentle 5s ease-in-out infinite'
                        }}
                    />
                </div>

                {/* Geometric Floating Shapes */}
                {Array.from({ length: 12 }).map((_, i) => (
                    <div
                        key={`shape-${i}`}
                        className="absolute rounded-full bg-green-400/10 transform-gpu"
                        style={{
                            width: `${8 + (i % 4) * 4}px`,
                            height: `${8 + (i % 4) * 4}px`,
                            left: `${10 + (i * 8)}%`,
                            top: `${20 + (i * 6)}%`,
                            animation: `geometricFloat ${4 + (i % 3)}s ease-in-out infinite, shimmer ${6 + (i % 4)}s ease-in-out infinite`,
                            animationDelay: `${i * 0.5}s`
                        }}
                    />
                ))}

                {/* Floating Diamond Shapes */}
                {Array.from({ length: 6 }).map((_, i) => (
                    <div
                        key={`diamond-${i}`}
                        className="absolute w-3 h-3 bg-green-300/20 transform rotate-45 transform-gpu"
                        style={{
                            left: `${15 + (i * 15)}%`,
                            top: `${25 + (i * 12)}%`,
                            animation: `diamondFloat ${5 + i}s ease-in-out infinite, sparkle ${3 + (i % 2)}s ease-in-out infinite`,
                            animationDelay: `${i * 0.8}s`
                        }}
                    />
                ))}

                {/* Elegant Floating Orbs */}
                <div 
                    className="absolute w-80 h-80 rounded-full transform-gpu"
                    style={{
                        background: 'radial-gradient(circle, rgba(34, 197, 94, 0.08) 0%, rgba(34, 197, 94, 0.02) 50%, transparent 100%)',
                        left: '10%',
                        top: '20%',
                        filter: 'blur(40px)',
                        animation: 'gentleDrift 20s ease-in-out infinite, breathe 8s ease-in-out infinite'
                    }}
                />
                
                <div 
                    className="absolute w-60 h-60 rounded-full transform-gpu"
                    style={{
                        background: 'radial-gradient(circle, rgba(74, 222, 128, 0.06) 0%, rgba(74, 222, 128, 0.01) 50%, transparent 100%)',
                        right: '15%',
                        bottom: '25%',
                        filter: 'blur(30px)',
                        animation: 'gentleDrift 15s ease-in-out infinite reverse, breathe 6s ease-in-out infinite',
                        animationDelay: '3s'
                    }}
                />

                <div 
                    className="absolute w-40 h-40 rounded-full transform-gpu"
                    style={{
                        background: 'radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, rgba(16, 185, 129, 0.02) 50%, transparent 100%)',
                        left: '70%',
                        top: '60%',
                        filter: 'blur(25px)',
                        animation: 'gentleDrift 12s ease-in-out infinite, breathe 10s ease-in-out infinite',
                        animationDelay: '6s'
                    }}
                />

                {/* Additional Medium Orbs */}
                <div 
                    className="absolute w-32 h-32 rounded-full transform-gpu"
                    style={{
                        background: 'radial-gradient(circle, rgba(34, 197, 94, 0.05) 0%, rgba(34, 197, 94, 0.01) 50%, transparent 100%)',
                        left: '25%',
                        bottom: '30%',
                        filter: 'blur(20px)',
                        animation: 'gentleDrift 14s ease-in-out infinite, breathe 7s ease-in-out infinite',
                        animationDelay: '2s'
                    }}
                />

                {/* Sophisticated Particle System */}
                {Array.from({ length: 15 }).map((_, i) => (
                    <div
                        key={`particle-${i}`}
                        className="absolute w-1 h-1 bg-green-400/60 rounded-full transform-gpu"
                        style={{
                            left: `${15 + (i * 6)}%`,
                            top: `${10 + (i * 7)}%`,
                            animation: `elegantFloat ${6 + (i % 4)}s ease-in-out infinite, twinkleStar ${3 + (i % 3)}s ease-in-out infinite`,
                            animationDelay: `${i * 0.6}s`
                        }}
                    />
                ))}

                {/* Glowing Stars with Elegant Animation */}
                {Array.from({ length: 8 }).map((_, i) => (
                    <Star
                        key={`star-${i}`}
                        className="absolute text-green-400/40 transform-gpu"
                        size={6 + (i % 4) * 3}
                        style={{
                            left: `${20 + (i * 12)}%`,
                            top: `${25 + (i * 9)}%`,
                            animation: `twinkleStar ${4 + (i % 3)}s ease-in-out infinite, elegantFloat ${8 + (i % 4) * 2}s ease-in-out infinite`,
                            animationDelay: `${i * 1.0}s`
                        }}
                    />
                ))}

                {/* Floating Lines and Connectors */}
                {Array.from({ length: 4 }).map((_, i) => (
                    <div
                        key={`line-${i}`}
                        className="absolute h-px bg-gradient-to-r from-transparent via-green-400/20 to-transparent transform-gpu"
                        style={{
                            width: `${100 + i * 50}px`,
                            left: `${20 + (i * 20)}%`,
                            top: `${30 + (i * 15)}%`,
                            transform: `rotate(${15 + i * 30}deg)`,
                            animation: `lineFloat ${8 + i * 2}s ease-in-out infinite, shimmer ${4 + i}s ease-in-out infinite`,
                            animationDelay: `${i * 1.5}s`
                        }}
                    />
                ))}

                {/* Subtle Gradient Waves */}
                <div 
                    className="absolute inset-0 opacity-20"
                    style={{
                        background: 'linear-gradient(45deg, transparent 0%, rgba(34, 197, 94, 0.03) 25%, transparent 50%, rgba(74, 222, 128, 0.02) 75%, transparent 100%)',
                        animation: 'waveShift 25s ease-in-out infinite'
                    }}
                />

                {/* Cinema Spotlight Effect */}
                <div 
                    className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 rounded-full opacity-10"
                    style={{
                        background: 'radial-gradient(ellipse at center, rgba(34, 197, 94, 0.15) 0%, rgba(34, 197, 94, 0.05) 30%, transparent 70%)',
                        filter: 'blur(60px)',
                        animation: 'spotlightPulse 12s ease-in-out infinite'
                    }}
                />

                {/* Animated Grid with Fade Effect */}
                <div className="absolute inset-0 opacity-5">
                    <div className="grid grid-cols-12 h-full">
                        {Array.from({ length: 12 }).map((_, i) => (
                            <div
                                key={i}
                                className="border-r border-green-500/20"
                                style={{ 
                                    animation: `gridFade ${3 + (i % 4)}s ease-in-out infinite`,
                                    animationDelay: `${i * 0.2}s` 
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-r from-green-950/20 to-black/20 pointer-events-none" />
            
            <div className="relative z-10 text-center px-4 flex flex-col items-center justify-center flex-grow py-10">
                {/* Redesigned Hero Section */}
                <div className={`transform transition-all duration-1500 ease-out ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}>
                    {/* Cinema-themed header */}
                    <div className="flex items-center justify-center mb-6 space-x-4">
                        <Film className="w-8 h-8 text-green-400 animate-spin" style={{ animationDuration: '8s' }} />
                        <div className="h-px w-12 bg-gradient-to-r from-transparent via-green-400 to-transparent"></div>
                        <Ticket className="w-8 h-8 text-green-300 animate-pulse" />
                        <div className="h-px w-12 bg-gradient-to-r from-transparent via-green-400 to-transparent"></div>
                        <Popcorn className="w-8 h-8 text-green-400 animate-bounce" />
                    </div>

                    {/* Dynamic Title with Enhanced Typewriter Effect */}
                    <div className="mb-4">
                        <h1 className="text-8xl font-bold leading-tight bg-gradient-to-r from-white via-green-200 to-green-400 text-transparent bg-clip-text mt-16">
                            {typewriterText}
                            <span 
                                className={`text-green-400 ${
                                    isTypingComplete 
                                        ? 'animate-pulse' 
                                        : 'animate-ping'
                                }`}
                                style={{
                                    animationDuration: isTypingComplete ? '2s' : '0.5s'
                                }}
                            >
                                |
                            </span>
                        </h1>
                        <div className="text-3xl font-light text-gray-300 mt-4 tracking-wide">
                            Your Local Cinema
                        </div>
                    </div>

                    {/* Smooth Rotating Tagline */}
                    <div className="h-16 flex items-center justify-center mb-8">
                        <p 
                            className="text-2xl text-gray-300 max-w-2xl mx-auto transition-opacity duration-500 ease-in-out"
                            style={{ opacity: taglineOpacity }}
                        >
                            {taglines[currentTagline]}
                        </p>
                    </div>

                    {/* Enhanced CTA Section */}
                    <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 mb-20 transform transition-all duration-1000 delay-500 ${
                        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
                    }`}>
                        {/* Primary CTA - Made Smaller */}
                        <button 
                            className="relative px-8 py-3 text-lg rounded-xl bg-gradient-to-r from-green-600 to-green-500 text-white transition-all duration-500 ease-in-out flex items-center justify-center group overflow-hidden transform hover:scale-105 hover:shadow-2xl hover:shadow-green-500/30 min-w-[180px]"
                            onClick={() => navigate("/signin")}
                        >
                            {/* Animated Background */}
                            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
                            
                            <span className="relative flex items-center z-10 font-semibold">
                                <Play className="mr-2 transition-all duration-300 group-hover:scale-125" size={16} />
                                Book Now
                                <ArrowRight 
                                    className="ml-2 transition-all duration-300 group-hover:translate-x-2 group-hover:scale-110"
                                    size={18}
                                />
                            </span>
                            
                            {/* Ripple Effects */}
                            <div className="absolute inset-0 rounded-xl bg-white/10 transform scale-0 group-hover:scale-100 transition-transform duration-1000 opacity-0 group-hover:opacity-100" />
                        </button>

                        {/* Secondary CTA - Enhanced with Animations */}
                        <button 
                            className="relative px-8 py-3 text-lg rounded-xl border-2 border-green-500/50 text-green-400 transition-all duration-500 ease-in-out flex items-center justify-center group min-w-[180px] backdrop-blur-sm overflow-hidden hover:scale-105 hover:border-green-400 hover:shadow-lg hover:shadow-green-500/20"
                            onClick={() => navigate("/movies")}
                        >
                            {/* Animated Background Fill */}
                            <div className="absolute inset-0 bg-gradient-to-r from-green-500/0 via-green-500/10 to-green-500/0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-600 origin-center" />
                            
                            {/* Animated Border Glow */}
                            <div className="absolute inset-0 rounded-xl border-2 border-green-400/0 group-hover:border-green-400/50 transition-all duration-500" />
                            
                            <span className="relative flex items-center z-10 font-medium group-hover:text-green-300 transition-colors duration-300">
                                <Film className="mr-2 transition-all duration-500 group-hover:rotate-180 group-hover:scale-110" size={18} />
                                Browse Movies
                            </span>
                            
                            {/* Shimmer Effect */}
                            <div className="absolute inset-0 -top-4 -bottom-4 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                            
                            {/* Corner Accents */}
                            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-green-400/0 group-hover:border-green-400 transition-colors duration-500 delay-100" />
                            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-green-400/0 group-hover:border-green-400 transition-colors duration-500 delay-200" />
                        </button>
                    </div>

                    {/* Quick Stats */}
                    <div className={`grid grid-cols-3 gap-8 max-w-2xl mx-auto mb-16 transform transition-all duration-1000 delay-700 ${
                        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
                    }`}>
                        <div className="text-center group cursor-pointer">
                            <div className="text-3xl font-bold text-green-400 group-hover:text-green-300 transition-colors duration-300">50+</div>
                            <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">Screens</div>
                        </div>
                        <div className="text-center group cursor-pointer">
                            <div className="text-3xl font-bold text-green-400 group-hover:text-green-300 transition-colors duration-300">4K</div>
                            <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">Quality</div>
                        </div>
                        <div className="text-center group cursor-pointer">
                            <div className="text-3xl font-bold text-green-400 group-hover:text-green-300 transition-colors duration-300">Dolby</div>
                            <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">Atmos</div>
                        </div>
                    </div>
                </div>
                
                {/* Enhanced Why Choose CineFlix Section */}
                <div className={`w-full px-4 mb-24 py-10 transform transition-all duration-1000 delay-700 ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}>
                    <h2 className="text-5xl font-bold mb-6 text-white hover:text-green-400 transition-colors duration-300 cursor-default">
                        Why CineFlix?
                    </h2>
                    <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-12 hover:text-white transition-colors duration-300">
                        Experience the ultimate cinema journey with premium features and unmatched comfort.
                        Discover why we're the preferred choice for movie enthusiasts.
                    </p>
                    
                    {/* Interactive Feature Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {features.map((feature, index) => {
                            const Icon = feature.icon;
                            const isActive = currentFeature === index;
                            
                            return (
                                <div 
                                    key={index}
                                    className={`group bg-zinc-900/80 rounded-lg p-6 flex flex-col items-start overflow-hidden relative cursor-pointer transform transition-all duration-500 hover:scale-105 hover:bg-zinc-800/90 hover:shadow-2xl hover:shadow-green-500/10 ${
                                        isActive ? 'ring-2 ring-green-500/50 scale-105' : ''
                                    }`}
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    {/* Animated Background Glow */}
                                    <div className={`absolute inset-0 bg-gradient-to-br from-green-500/0 to-green-500/10 transform transition-all duration-500 ${
                                        isActive ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
                                    } group-hover:opacity-100 group-hover:scale-100`} />
                                    
                                    <div className="flex flex-col items-start z-10 relative">
                                        <h3 className="text-3xl font-bold text-green-500 mb-1 group-hover:text-green-400 transition-colors duration-300">
                                            {feature.title}
                                        </h3>
                                        <p className="text-white text-xl mb-2 group-hover:text-gray-200 transition-colors duration-300">
                                            {feature.subtitle}
                                        </p>
                                        <p className="text-gray-400 text-sm opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                                            {feature.description}
                                        </p>
                                    </div>
                                    
                                    {/* Animated Icon */}
                                    <Icon 
                                        className={`absolute right-4 bottom-4 text-gray-700 transition-all duration-500 group-hover:text-green-500/30 group-hover:scale-110 ${
                                            isActive ? 'opacity-30 scale-110' : 'opacity-20'
                                        }`} 
                                        size={100} 
                                    />
                                    
                                    {/* Hover Effect Lines */}
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-green-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                                    <div className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-l from-green-500 to-green-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right delay-100" />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            
            {/* Enhanced Feature Showcase Section at bottom */}
            <div className="absolute bottom-0 w-full bg-zinc-900/90 backdrop-blur-md py-6 mt-10 border-t border-green-500/20">
                <div className="container mx-auto grid grid-cols-4 divide-x divide-green-800/30">
                    {[
                        { value: "300+", label: "movie screenings", icon: Film },
                        { value: "24/7", label: "dedicated support", icon: Headphones },
                        { value: "Instant", label: "ticket reservations", icon: Clock },
                        { value: "Fast. Precise.", label: "service delivery", icon: Star }
                    ].map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <div 
                                key={index}
                                className="px-6 text-center group cursor-pointer transform hover:scale-105 transition-all duration-300"
                            >
                                <div className="flex items-center justify-center mb-2">
                                    <Icon className="w-6 h-6 text-green-500 mr-2 group-hover:text-green-400 transition-colors duration-300" />
                                    <h3 className="text-3xl font-bold text-white group-hover:text-green-400 transition-colors duration-300">
                                        {stat.value}
                                    </h3>
                                </div>
                                <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                                    {stat.label}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Home;