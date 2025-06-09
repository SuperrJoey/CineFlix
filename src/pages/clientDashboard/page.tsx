import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Film, Clock, Sparkles, Ticket, Popcorn, Star, Calendar } from "lucide-react";
import PageWrapper from "../../components/pageWrapper";

const ClientDashboardCard = ({
  icon: IconComponent,
  title,
  description,
  onClick,
  index,
  isPrimary = false,
}: {
  icon: any;
  title: string;
  description: string;
  onClick: () => void;
  index: number;
  isPrimary?: boolean;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative backdrop-blur-md border p-8 rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-green-500/20 transform hover:scale-105 transition-all duration-500 text-white text-left overflow-hidden ${
        isPrimary 
          ? 'bg-gradient-to-br from-green-900/90 to-green-800/80 border-green-400/50 col-span-full md:col-span-2' 
          : 'bg-gradient-to-br from-zinc-900/90 to-zinc-800/80 border-green-500/30'
      }`}
      style={{
        animation: `cardEntrance 0.8s ease-out forwards`,
        animationDelay: `${index * 0.2}s`,
        opacity: 0,
        transform: 'translateY(30px)'
      }}
    >
      {/* Animated Background Glow */}
      <div className={`absolute inset-0 bg-gradient-to-br from-green-500/0 to-green-500/10 transform transition-all duration-500 ${
        isHovered ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
      }`} />
      
      {/* Animated Border Lines */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-green-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      <div className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-l from-green-500 to-green-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right delay-100" />
      
      {/* Icon with Enhanced Animation */}
      <div className="relative flex items-center justify-center mb-6 z-10">
        <div className="relative">
          <IconComponent 
            className={`w-16 h-16 text-green-400 transition-all duration-500 group-hover:text-green-300 group-hover:scale-125 ${
              isHovered ? 'drop-shadow-lg' : ''
            }`}
          />
          {/* Icon Glow Effect */}
          <div className={`absolute inset-0 w-16 h-16 bg-green-400/20 rounded-full blur-xl transition-all duration-500 ${
            isHovered ? 'scale-150 opacity-100' : 'scale-100 opacity-0'
          }`} />
        </div>
      </div>
      
      <div className="relative z-10">
        <h2 className={`font-bold mb-3 text-white group-hover:text-green-100 transition-colors duration-300 ${
          isPrimary ? 'text-3xl' : 'text-2xl'
        }`}>
          {title}
        </h2>
        <p className={`text-gray-400 group-hover:text-gray-300 transition-colors duration-300 leading-relaxed ${
          isPrimary ? 'text-lg' : 'text-base'
        }`}>
          {description}
        </p>
      </div>
      
      {/* Shimmer Effect */}
      <div className="absolute inset-0 -top-4 -bottom-4 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      
      {/* Corner Accents */}
      <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-green-400/0 group-hover:border-green-400 transition-colors duration-500 delay-100" />
      <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-green-400/0 group-hover:border-green-400 transition-colors duration-500 delay-200" />
    </button>
  );
};

const ClientDashboard = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem("Name") || "Guest";
  const [isVisible, setIsVisible] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    setIsVisible(true);
    
    // Update time every minute
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const dashboardItems = [
    {
      icon: Film,
      title: "Browse Movies",
      description: "Discover the latest movies, check showtimes, and find your next favorite film experience.",
      onClick: () => navigate("/movies"),
      isPrimary: true
    },
    {
      icon: Ticket,
      title: "Book Tickets",
      description: "View showtimes and book tickets for your favorite movies.",
      onClick: () => navigate("/seats")
    },
    {
      icon: Calendar,
      title: "Showtimes",
      description: "Check movie schedules and available time slots.",
      onClick: () => navigate("/seats")
    },
    {
      icon: Star,
      title: "Customer Info",
      description: "Manage your profile and preferences.",
      onClick: () => navigate("/customer")
    }
  ];

  return (
    <PageWrapper>
      <div className="py-20 min-h-screen bg-gradient-to-br from-green-950 via-black to-black relative overflow-hidden">
        {/* Enhanced Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating Orbs */}
          <div 
            className="absolute w-80 h-80 rounded-full transform-gpu opacity-20"
            style={{
              background: 'radial-gradient(circle, rgba(34, 197, 94, 0.08) 0%, rgba(34, 197, 94, 0.02) 50%, transparent 100%)',
              left: '5%',
              top: '10%',
              filter: 'blur(40px)',
              animation: 'gentleDrift 20s ease-in-out infinite'
            }}
          />
          
          <div 
            className="absolute w-60 h-60 rounded-full transform-gpu opacity-15"
            style={{
              background: 'radial-gradient(circle, rgba(74, 222, 128, 0.06) 0%, rgba(74, 222, 128, 0.01) 50%, transparent 100%)',
              right: '10%',
              bottom: '15%',
              filter: 'blur(30px)',
              animation: 'gentleDrift 15s ease-in-out infinite reverse',
              animationDelay: '3s'
            }}
          />

          {/* Cinema Elements */}
          <div className="absolute top-32 left-16 opacity-20">
            <Film 
              className="text-green-400/30 transform-gpu"
              size={24}
              style={{
                animation: 'smoothFloat 8s ease-in-out infinite, rotateGentle 12s linear infinite'
              }}
            />
          </div>
          
          <div className="absolute top-1/3 right-20 opacity-15">
            <Popcorn 
              className="text-green-300/40 transform-gpu"
              size={20}
              style={{
                animation: 'smoothFloat 10s ease-in-out infinite reverse'
              }}
            />
          </div>

          <div className="absolute bottom-1/3 left-1/4 opacity-25">
            <Ticket 
              className="text-green-400/35 transform-gpu"
              size={18}
              style={{
                animation: 'smoothFloat 9s ease-in-out infinite'
              }}
            />
          </div>

          {/* Floating Particles */}
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={`particle-${i}`}
              className="absolute w-1 h-1 bg-green-400/40 rounded-full transform-gpu"
              style={{
                left: `${15 + (i * 8)}%`,
                top: `${25 + (i * 6)}%`,
                animation: `particleFloat ${6 + (i % 3)}s ease-in-out infinite, twinkle ${3 + (i % 2)}s ease-in-out infinite`,
                animationDelay: `${i * 0.8}s`
              }}
            />
          ))}

          {/* Subtle Grid */}
          <div className="absolute inset-0 opacity-5">
            <div className="grid grid-cols-12 h-full">
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="border-r border-green-500/20"
                  style={{ 
                    animation: `gridFade ${4 + (i % 3)}s ease-in-out infinite`,
                    animationDelay: `${i * 0.3}s` 
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6">
          {/* Enhanced Header Section */}
          <div className={`text-center mb-12 transform transition-all duration-1000 ease-out ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            {/* Welcome Message with Animation */}
            <div className="mb-6">
              <h1 className="text-6xl font-bold bg-gradient-to-r from-white via-green-200 to-green-400 text-transparent bg-clip-text mb-4">
                Welcome, {userName}
              </h1>
              <div className="flex items-center justify-center space-x-4 text-gray-400">
                <Clock className="w-5 h-5" />
                <span className="text-lg">
                  {currentTime.toLocaleDateString()} • {currentTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </span>
              </div>
            </div>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Your gateway to the ultimate cinema experience. Book tickets, explore movies, 
              and create unforgettable memories at CineFlix.
            </p>
          </div>

          {/* Quick Stats Overview */}
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 transform transition-all duration-1000 delay-300 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <div className="bg-gradient-to-br from-zinc-900/80 to-zinc-800/60 backdrop-blur-md rounded-xl p-6 border border-green-500/20 text-center">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Movies Available</p>
                  <p className="text-3xl font-bold text-green-400">24</p>
                </div>
                <div className="bg-green-500/20 p-3 rounded-lg">
                  <Film className="w-8 h-8 text-green-400" />
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-zinc-900/80 to-zinc-800/60 backdrop-blur-md rounded-xl p-6 border border-green-500/20 text-center">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Your Bookings</p>
                  <p className="text-3xl font-bold text-green-400">3</p>
                </div>
                <div className="bg-green-500/20 p-3 rounded-lg">
                  <Ticket className="w-8 h-8 text-green-400" />
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-zinc-900/80 to-zinc-800/60 backdrop-blur-md rounded-xl p-6 border border-green-500/20 text-center">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Loyalty Points</p>
                  <p className="text-3xl font-bold text-green-400">1,250</p>
                </div>
                <div className="bg-green-500/20 p-3 rounded-lg">
                  <Star className="w-8 h-8 text-green-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Main Dashboard Grid */}
          <div className={`transform transition-all duration-1000 delay-500 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-white">Quick Actions</h2>
              <Sparkles className="w-6 h-6 text-green-400 animate-pulse" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {dashboardItems.map((item, index) => (
                <ClientDashboardCard
                  key={index}
                  icon={item.icon}
                  title={item.title}
                  description={item.description}
                  onClick={item.onClick}
                  index={index}
                  isPrimary={item.isPrimary}
                />
              ))}
            </div>
          </div>

          {/* Enhanced Featured Section */}
          <div className={`mt-16 transform transition-all duration-1000 delay-700 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <div className="bg-gradient-to-br from-zinc-900/70 to-zinc-800/50 backdrop-blur-md rounded-2xl p-8 border border-green-500/20">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-3xl font-bold text-white">Featured This Week</h3>
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-6 h-6 text-green-400 animate-pulse" />
                  <Film className="w-6 h-6 text-green-400" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* New Releases Card */}
                <div className="group relative bg-gradient-to-br from-emerald-900/80 to-emerald-800/60 rounded-xl p-6 border border-emerald-500/30 hover:border-emerald-400/50 transition-all duration-500 cursor-pointer transform hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/20 overflow-hidden"
                     onClick={() => navigate("/movies?filter=new")}>
                  {/* Background Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 to-emerald-500/10 transform transition-all duration-500 group-hover:scale-100 group-hover:opacity-100 scale-95 opacity-0" />
                  
                  {/* Animated Border */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-emerald-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div className="bg-emerald-500/20 p-3 rounded-lg group-hover:bg-emerald-500/30 transition-colors duration-300">
                        <Star className="w-8 h-8 text-emerald-400 group-hover:scale-110 transition-transform duration-300" />
                      </div>
                      <div className="text-sm text-emerald-300 bg-emerald-500/20 px-3 py-1 rounded-full">
                        NEW
                      </div>
                    </div>
                    
                    <h4 className="text-2xl font-bold text-white mb-2 group-hover:text-emerald-100 transition-colors duration-300">
                      New Releases
                    </h4>
                    <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 mb-4">
                      Fresh movies just arrived this week
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-3xl font-bold text-emerald-400 group-hover:text-emerald-300 transition-colors duration-300">
                        5
                      </div>
                      <div className="text-sm text-gray-500 group-hover:text-gray-400 transition-colors duration-300">
                        movies added
                      </div>
                    </div>
                    
                    {/* Hover Arrow */}
                    <div className="mt-4 flex items-center text-emerald-400 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-10px] group-hover:translate-x-0">
                      <span className="text-sm mr-2">Explore</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                  
                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 -top-4 -bottom-4 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </div>

                {/* Popular Movies Card */}
                <div className="group relative bg-gradient-to-br from-amber-900/80 to-orange-800/60 rounded-xl p-6 border border-amber-500/30 hover:border-amber-400/50 transition-all duration-500 cursor-pointer transform hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/20 overflow-hidden"
                     onClick={() => navigate("/movies?filter=popular")}>
                  {/* Background Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 to-amber-500/10 transform transition-all duration-500 group-hover:scale-100 group-hover:opacity-100 scale-95 opacity-0" />
                  
                  {/* Animated Border */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 to-orange-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div className="bg-amber-500/20 p-3 rounded-lg group-hover:bg-amber-500/30 transition-colors duration-300">
                        <Film className="w-8 h-8 text-amber-400 group-hover:scale-110 transition-transform duration-300" />
                      </div>
                      <div className="text-sm text-amber-300 bg-amber-500/20 px-3 py-1 rounded-full">
                        HOT
                      </div>
                    </div>
                    
                    <h4 className="text-2xl font-bold text-white mb-2 group-hover:text-amber-100 transition-colors duration-300">
                      Popular
                    </h4>
                    <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 mb-4">
                      Most booked movies this month
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-3xl font-bold text-amber-400 group-hover:text-amber-300 transition-colors duration-300">
                        12
                      </div>
                      <div className="text-sm text-gray-500 group-hover:text-gray-400 transition-colors duration-300">
                        trending now
                      </div>
                    </div>
                    
                    {/* Hover Arrow */}
                    <div className="mt-4 flex items-center text-amber-400 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-10px] group-hover:translate-x-0">
                      <span className="text-sm mr-2">Browse</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                  
                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 -top-4 -bottom-4 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </div>

                {/* Coming Soon Card */}
                <div className="group relative bg-gradient-to-br from-purple-900/80 to-indigo-800/60 rounded-xl p-6 border border-purple-500/30 hover:border-purple-400/50 transition-all duration-500 cursor-pointer transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 overflow-hidden"
                     onClick={() => navigate("/movies?filter=coming-soon")}>
                  {/* Background Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-purple-500/10 transform transition-all duration-500 group-hover:scale-100 group-hover:opacity-100 scale-95 opacity-0" />
                  
                  {/* Animated Border */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-indigo-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div className="bg-purple-500/20 p-3 rounded-lg group-hover:bg-purple-500/30 transition-colors duration-300">
                        <Calendar className="w-8 h-8 text-purple-400 group-hover:scale-110 transition-transform duration-300" />
                      </div>
                      <div className="text-sm text-purple-300 bg-purple-500/20 px-3 py-1 rounded-full">
                        SOON
                      </div>
                    </div>
                    
                    <h4 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-100 transition-colors duration-300">
                      Coming Soon
                    </h4>
                    <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 mb-4">
                      Exciting premieres ahead
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-3xl font-bold text-purple-400 group-hover:text-purple-300 transition-colors duration-300">
                        8
                      </div>
                      <div className="text-sm text-gray-500 group-hover:text-gray-400 transition-colors duration-300">
                        upcoming
                      </div>
                    </div>
                    
                    {/* Hover Arrow */}
                    <div className="mt-4 flex items-center text-purple-400 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-10px] group-hover:translate-x-0">
                      <span className="text-sm mr-2">Preview</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                  
                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 -top-4 -bottom-4 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </div>
              </div>
              
              {/* Bottom Call-to-Action */}
              <div className="mt-8 text-center">
                <button 
                  onClick={() => navigate("/movies")}
                  className="group relative px-8 py-3 bg-gradient-to-r from-green-600 to-green-500 rounded-xl text-white transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-green-500/30 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  <span className="relative z-10 flex items-center font-semibold">
                    <Film className="mr-2 transition-transform duration-300 group-hover:scale-110" size={18} />
                    View All Movies
                    <svg className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default ClientDashboard;