import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Film, Users, UserCheck, BarChart3, Armchair, Clock, Sparkles } from "lucide-react";
import PageWrapper from "../../components/pageWrapper";
import Header from "../../components/Header";

const DashboardCard = ({
  icon,
  title,
  description,
  onClick,
  index,
}: {
  icon: string;
  title: string;
  description: string;
  onClick: () => void;
  index: number;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-gradient-to-br from-zinc-900/90 to-zinc-800/80 backdrop-blur-md border border-green-500/30 p-8 rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-green-500/20 transform hover:scale-105 transition-all duration-500 text-white text-left overflow-hidden"
    >
      {/* Animated Background Glow */}
      <div className={`absolute inset-0 bg-gradient-to-br from-green-500/0 to-green-500/10 transform transition-all duration-500 ${
        isHovered ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
      }`} />
      
      {/* Animated Border Lines */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-green-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      <div className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-l from-green-500 to-green-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right delay-100" />
      
      {/* Enhanced Icon Display */}
      <div className="relative flex items-center justify-center mb-6 z-10">
        <div className="relative">
          <div className={`text-4xl transition-all duration-500 group-hover:scale-125 ${
            isHovered ? 'drop-shadow-lg filter brightness-125' : ''
          }`}>
            {icon}
          </div>
          {/* Icon Glow Effect */}
          <div className={`absolute inset-0 bg-green-400/20 rounded-full blur-xl transition-all duration-500 ${
            isHovered ? 'scale-150 opacity-100' : 'scale-100 opacity-0'
          }`} />
        </div>
      </div>
      
      <div className="relative z-10">
        <h2 className="text-2xl font-semibold mb-2 text-white group-hover:text-green-100 transition-colors duration-300">
          {title}
        </h2>
        <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 leading-relaxed">
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

const Dashboard = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("Name") || "Admin";
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
      icon: "🎥",
      title: "Movies",
      description: "Manage movie listings, showtimes, and screens.",
      onClick: () => navigate("/movies")
    },
    {
      icon: "💺",
      title: "Seats",
      description: "Handle seat bookings and layout.",
      onClick: () => navigate("/seats")
    },
    {
      icon: "🤵",
      title: "Staff",
      description: "Manage staff details, payroll, and hours.",
      onClick: () => navigate("/staff")
    },
    {
      icon: "👥",
      title: "Customers",
      description: "Manage customer details and preferences.",
      onClick: () => navigate("/customer")
    },
    {
      icon: "📃",
      title: "Reports",
      description: "Generate insights, revenue reports, and trends.",
      onClick: () => navigate("/report")
    }
  ];

  return (
    <PageWrapper>
      <div className="relative">
        <Header />
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

            {/* Floating Particles */}
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={`particle-${i}`}
                className="absolute w-1 h-1 bg-green-400/40 rounded-full transform-gpu"
                style={{
                  left: `${10 + (i * 8)}%`,
                  top: `${20 + (i * 6)}%`,
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
            
            <div className="absolute bottom-40 right-24 opacity-15">
              <Users 
                className="text-green-300/40 transform-gpu"
                size={20}
                style={{
                  animation: 'smoothFloat 10s ease-in-out infinite reverse'
                }}
              />
            </div>
          </div>

          <div className="relative z-10 max-w-6xl mx-auto bg-transparent rounded-2xl shadow-lg p-8 border border-green-500/20 backdrop-blur-sm">
            <div className="flex flex-col">
              {/* Original Header with Enhanced Animation */}
              <div className="translate-y-0 opacity-100">
                <h1 className="text-4xl font-extrabold text-gray-300 mb-2">
                  Welcome, {username}
                </h1>
                <p className="text-lg text-gray-400 mt-1 mb-8">
                  Manage your movie listings, staff, customers, and everything in between.
                </p>
              </div>

              {/* Time Display */}
              <div className="flex items-center justify-center mb-8 translate-y-0 opacity-100">
                <div className="bg-zinc-900/60 backdrop-blur-md rounded-lg px-4 py-2 border border-green-500/20">
                  <div className="flex items-center space-x-3 text-gray-400">
                    <Clock className="w-4 h-4 text-green-400" />
                    <span className="text-sm">
                      {currentTime.toLocaleDateString()} • {currentTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Stats Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 translate-y-0 opacity-100">
                <div className="bg-gradient-to-br from-zinc-900/70 to-zinc-800/50 backdrop-blur-md rounded-xl p-4 border border-green-500/20 text-center">
                  <div className="text-2xl font-bold text-green-400">$12,450</div>
                  <div className="text-sm text-gray-400">Today's Revenue</div>
                </div>
                
                <div className="bg-gradient-to-br from-zinc-900/70 to-zinc-800/50 backdrop-blur-md rounded-xl p-4 border border-green-500/20 text-center">
                  <div className="text-2xl font-bold text-green-400">287</div>
                  <div className="text-sm text-gray-400">Active Bookings</div>
                </div>
                
                <div className="bg-gradient-to-br from-zinc-900/70 to-zinc-800/50 backdrop-blur-md rounded-xl p-4 border border-green-500/20 text-center">
                  <div className="text-2xl font-bold text-green-400">24</div>
                  <div className="text-sm text-gray-400">Movies Showing</div>
                </div>
              </div>

              {/* Enhanced Dashboard Grid */}
              <div className="translate-y-0 opacity-100">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">Quick Actions</h2>
                  <Sparkles className="w-5 h-5 text-green-400 animate-pulse" />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {dashboardItems.map((item, index) => (
                    <DashboardCard
                      key={index}
                      icon={item.icon}
                      title={item.title}
                      description={item.description}
                      onClick={item.onClick}
                      index={index}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Dashboard;
