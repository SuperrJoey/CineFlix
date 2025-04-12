import { useNavigate } from "react-router-dom";
import PageWrapper from "../../components/pageWrapper";

const DashboardCard = ({
  icon,
  title,
  description,
  onClick,
}: {
  icon: string;
  title: string;
  description: string;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className="bg-gradient-to-br from-[#1f2937] to-[#111827] border border-[#6A7077]
      p-6 rounded-2xl shadow-md hover:shadow-2xl transform hover:scale-105 transition-all duration-200
      text-white text-left"
  >
    <div className="flex items-center text-3xl justify-center mb-4">{icon}</div>
    <h2 className="text-xl font-semibold mb-1">{title}</h2>
    <p className="text-sm text-gray-400">{description}</p>
  </button>
);

const Dashboard = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("Name") || "Admin";

  return (
    <PageWrapper>
      <div className="py-20 min-h-screen bg-gradient-to-br from-green-950 via-black to-black">
        <div className="max-w-6xl mx-auto bg-transparent rounded-2xl shadow-lg p-8 border border-[#6A7077]">
          <div className="flex flex-col">
            <h1 className="text-4xl font-extrabold text-gray-300 mb-2">
              Welcome, {username}
            </h1>
            <p className="text-lg text-gray-400 mt-1 mb-8">
              Manage your movie listings, staff, customers, and everything in between.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <DashboardCard
                icon="🎥"
                title="Movies"
                description="Manage movie listings, showtimes, and screens."
                onClick={() => navigate("/movies")}
              />
              <DashboardCard
                icon="💺"
                title="Seats"
                description="Handle seat bookings and layout."
                onClick={() => navigate("/seats")}
              />
              <DashboardCard
                icon="🤵"
                title="Staff"
                description="Manage staff details, payroll, and hours."
                onClick={() => navigate("/staff")}
              />
              <DashboardCard
                icon="👥"
                title="Customers"
                description="Manage customer details and preferences."
                onClick={() => navigate("/staff")}
              />
              <DashboardCard
                icon="📃"
                title="Reports"
                description="Generate insights, revenue reports, and trends."
                onClick={() => navigate("/staff")}
              />
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Dashboard;
