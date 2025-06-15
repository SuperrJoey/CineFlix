import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MdEventSeat } from 'react-icons/md';
import axios from 'axios';

interface Seat {
  seatid: number;
  seatnumber: number;
  screenid: number;
  showtimeid: number;
  availabilitystatus: string;
  bookingid: number | null;
  duration: number;
}

interface Showtime {
  showtimeid: number;
  movieid: number;
  screenid: number;
  starttime: string;
  endtime: string;
  title: string;
  genre: string;
  duration: number;
}

interface BookingStats {
  totalSeats: number;
  bookedSeats: number;
  availableSeats: number;
  occupancyRate: number;
}

const AdminBookingView = () => {
  const { screenId, showtimeId } = useParams();
  const [seats, setSeats] = useState<Seat[]>([]);
  const [showtime, setShowtime] = useState<Showtime | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<BookingStats>({
    totalSeats: 0,
    bookedSeats: 0,
    availableSeats: 0,
    occupancyRate: 0
  });

  useEffect(() => {
    const fetchShowtimeAndSeats = async () => {
      try {
        setLoading(true);
        
        // If we have a showtimeId, use it directly
        if (showtimeId) {
          // Fetch showtime details
          const showtimeResponse = await axios.get(`https://cineflix-be.onrender.com/api/showtimes/${showtimeId}`);
          
          if (showtimeResponse.data) {
            setShowtime(showtimeResponse.data);
            
            // Then fetch seats for this showtime
            const seatsResponse = await axios.get(`https://cineflix-be.onrender.com/api/seats/showtime/${showtimeId}`);
            const seatsData = seatsResponse.data;
            setSeats(seatsData);
            
            // Calculate statistics
            const totalSeats = seatsData.length;
            const bookedSeats = seatsData.filter((seat: Seat) => seat.availabilitystatus === 'booked').length;
            const availableSeats = totalSeats - bookedSeats;
            const occupancyRate = totalSeats > 0 ? (bookedSeats / totalSeats) * 100 : 0;
            
            setStats({
              totalSeats,
              bookedSeats,
              availableSeats,
              occupancyRate
            });
          } else {
            setError("Showtime not found");
          }
        } 
        // If we only have a screenId, we need to find the current showtime for this screen
        else if (screenId) {
          // First get all showtimes
          const allShowtimesResponse = await axios.get(`https://cineflix-be.onrender.com/api/showtimes`);
          
          // Find the current showtime for this screen
          const currentTime = new Date();
          const currentShowtime = allShowtimesResponse.data.find((st: Showtime) => {
            const startTime = new Date(st.starttime);
            const endTime = new Date(st.endtime);
            return st.screenid === parseInt(screenId) && 
                   startTime <= currentTime && 
                   endTime >= currentTime;
          });
          
          if (currentShowtime) {
            setShowtime(currentShowtime);
            
            // Then fetch seats for this showtime
            const seatsResponse = await axios.get(`https://cineflix-be.onrender.com/api/seats/showtime/${currentShowtime.showtimeid}`);
            const seatsData = seatsResponse.data;
            setSeats(seatsData);
            
            // Calculate statistics
            const totalSeats = seatsData.length;
            const bookedSeats = seatsData.filter((seat: Seat) => seat.availabilitystatus === 'booked').length;
            const availableSeats = totalSeats - bookedSeats;
            const occupancyRate = totalSeats > 0 ? (bookedSeats / totalSeats) * 100 : 0;
            
            setStats({
              totalSeats,
              bookedSeats,
              availableSeats,
              occupancyRate
            });
          } else {
            setError("No active showtime found for this screen");
          }
        } else {
          setError("No screen or showtime ID provided");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load seat information");
      } finally {
        setLoading(false);
      }
    };

    fetchShowtimeAndSeats();
  }, [screenId, showtimeId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-950 via-black to-black py-20 flex items-center justify-center">
        <div className="text-white text-xl">Loading seats...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-950 via-black to-black py-20 flex items-center justify-center">
        <div className="text-white text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-950 via-black to-black py-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-white">Seat Management (Admin View)</h1>
        
        {showtime && (
          <div className="text-center mb-6 text-white">
            <h2 className="text-xl font-semibold">{showtime.title}</h2>
            <p className="text-gray-300">
              {new Date(showtime.starttime).toLocaleString('en-IN', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
              })} • Screen {showtime.screenid}
            </p>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/10 rounded-lg p-4 text-white text-center">
            <p className="text-sm text-gray-300">Total Seats</p>
            <p className="text-3xl font-bold">{stats.totalSeats}</p>
          </div>
          <div className="bg-red-500/20 rounded-lg p-4 text-white text-center">
            <p className="text-sm text-gray-300">Booked Seats</p>
            <p className="text-3xl font-bold">{stats.bookedSeats}</p>
          </div>
          <div className="bg-green-500/20 rounded-lg p-4 text-white text-center">
            <p className="text-sm text-gray-300">Available Seats</p>
            <p className="text-3xl font-bold">{stats.availableSeats}</p>
          </div>
          <div className="bg-blue-500/20 rounded-lg p-4 text-white text-center">
            <p className="text-sm text-gray-300">Occupancy Rate</p>
            <p className="text-3xl font-bold">{stats.occupancyRate.toFixed(2)}%</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h3 className="text-xl font-semibold mb-4 text-center">Seat Layout</h3>
          
          <div className="grid grid-cols-10 gap-2 mb-8">
            {seats.map(seat => (
              <div
                key={seat.seatid}
                className={`
                  p-2 rounded-lg flex items-center justify-center
                  ${seat.availabilitystatus === 'booked'
                    ? 'bg-red-500 text-white' 
                    : 'bg-green-500 text-white'
                  }
                  border border-gray-300
                `}
              >
                <MdEventSeat className="w-6 h-6" />
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-8 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-green-500 rounded-lg"></div>
              <span>Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-red-500 rounded-lg"></div>
              <span>Booked</span>
            </div>
          </div>
        </div>

        {/* Booking Details (you could expand this section to show specific booking info) */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-4 text-center">Revenue Information</h3>
          <div className="flex justify-between items-center px-4">
            <div>
              <p className="text-lg">Ticket Price:</p>
              <p className="text-lg">Total Revenue:</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-semibold">₹200 per seat</p>
              <p className="text-lg font-semibold">₹{stats.bookedSeats * 200}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminBookingView;