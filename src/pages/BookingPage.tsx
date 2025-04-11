import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MdEventSeat } from 'react-icons/md';
import axios from 'axios';

interface Seat {
  SeatID: number;
  SeatNumber: number;
  screenID: number;
  ShowtimeID: number;
  AvailabilityStatus: string;
  BookingID: number | null;
}

interface Showtime {
  ShowtimeID: number;
  MovieID: number;
  screenID: number;
  StartTime: string;
  EndTime: string;
  Title: string;
  Genre: string;
  Duration: number;
}

const BookingPage = () => {
  const { screenId, showtimeId } = useParams();
  const navigate = useNavigate();
  const [seats, setSeats] = useState<Seat[]>([]);
  const [showtime, setShowtime] = useState<Showtime | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const MAX_SEATS_PER_BOOKING = 4;

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/signin');
      return;
    }
    setIsAuthenticated(true);

    const fetchShowtimeAndSeats = async () => {
      try {
        setLoading(true);
        
        // If we have a showtimeId, use it directly
        if (showtimeId) {
          // Fetch showtime details
          const showtimeResponse = await axios.get(`http://localhost:5000/api/showtimes/${showtimeId}`);
          
          if (showtimeResponse.data) {
            setShowtime(showtimeResponse.data);
            
            // Then fetch seats for this showtime
            const seatsResponse = await axios.get(`http://localhost:5000/api/seats/showtime/${showtimeId}`);
            setSeats(seatsResponse.data);
          } else {
            setError("Showtime not found");
          }
        } 
        // If we only have a screenId, we need to find the current showtime for this screen
        else if (screenId) {
          // First get all showtimes
          const allShowtimesResponse = await axios.get(`http://localhost:5000/api/showtimes`);
          
          // Find the current showtime for this screen
          const currentTime = new Date();
          const currentShowtime = allShowtimesResponse.data.find((st: Showtime) => {
            const startTime = new Date(st.StartTime);
            const endTime = new Date(st.EndTime);
            return st.screenID === parseInt(screenId) && 
                   startTime <= currentTime && 
                   endTime >= currentTime;
          });
          
          if (currentShowtime) {
            setShowtime(currentShowtime);
            
            // Then fetch seats for this showtime
            const seatsResponse = await axios.get(`http://localhost:5000/api/seats/showtime/${currentShowtime.ShowtimeID}`);
            setSeats(seatsResponse.data);
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
  }, [screenId, showtimeId, navigate]);

  const handleSeatClick = (seatId: number) => {
    if (!isAuthenticated) {
      navigate('/signin');
      return;
    }

    // Check if seat is already booked
    const seat = seats.find(s => s.SeatID === seatId);
    if (seat && seat.AvailabilityStatus === 'booked') {
      return;
    }

    setSelectedSeats(prev => {
      // If seat is already selected, remove it
      if (prev.includes(seatId)) {
        return prev.filter(id => id !== seatId);
      }
      
      // If adding this seat would exceed the limit, show an alert
      if (prev.length >= MAX_SEATS_PER_BOOKING) {
        alert(`You can only book a maximum of ${MAX_SEATS_PER_BOOKING} seats per booking.`);
        return prev;
      }
      
      // Otherwise, add the seat
      return [...prev, seatId];
    });
  };

  const handleBooking = async () => {
    if (selectedSeats.length === 0) {
      alert('Please select at least one seat');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token || !showtime) return;

      const response = await axios.post(
        `http://localhost:5000/api/seats/showtime/${showtime.ShowtimeID}/book`,
        { seatIds: selectedSeats },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {
        alert('Booking successful!');
        navigate('/client-dashboard');
      } else {
        alert('Booking failed. Please try again.');
      }
    } catch (error) {
      console.error('Booking error:', error);
      alert('Failed to book seats. Please try again.');
    }
  };

  if (!isAuthenticated) {
    return null;
  }

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
        <h1 className="text-3xl font-bold text-center mb-8 text-white">Select Seats</h1>
        
        {showtime && (
          <div className="text-center mb-6 text-white">
            <h2 className="text-xl font-semibold">{showtime.Title}</h2>
            <p className="text-gray-300">
                    {new Date(showtime.StartTime).toLocaleString('en-IN', {
                        weekday: 'long',
                        month: 'long',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: '2-digit',
                        hour12: true
                    })} • Screen {showtime.screenID}
                    </p>

            <p className="text-gray-300 mt-2">
              Maximum {MAX_SEATS_PER_BOOKING} seats per booking
            </p>
          </div>
        )}
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="grid grid-cols-10 gap-2 mb-8">
            {seats.map(seat => (
              <button
                key={seat.SeatID}
                onClick={() => handleSeatClick(seat.SeatID)}
                disabled={seat.AvailabilityStatus === 'booked' || 
                         (selectedSeats.length >= MAX_SEATS_PER_BOOKING && 
                          !selectedSeats.includes(seat.SeatID))}
                className={`
                  p-2 rounded-lg transition-colors
                  ${seat.AvailabilityStatus === 'booked'
                    ? 'bg-red-500 cursor-not-allowed' 
                    : selectedSeats.includes(seat.SeatID)
                      ? 'bg-green-500' 
                      : selectedSeats.length >= MAX_SEATS_PER_BOOKING
                        ? 'bg-white opacity-50 cursor-not-allowed'
                        : 'bg-white hover:bg-gray-200'
                  }
                  border border-gray-300
                `}
              >
                <MdEventSeat className="w-6 h-6" />
              </button>
            ))}
          </div>

          <div className="flex justify-center gap-8 mb-8">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-white border border-gray-300 rounded-lg"></div>
              <span>Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-red-500 rounded-lg"></div>
              <span>Booked</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-green-500 rounded-lg"></div>
              <span>Selected</span>
            </div>
          </div>

          <div className="text-center">
            <p className="mb-4">
              Selected Seats: {selectedSeats.length} of {MAX_SEATS_PER_BOOKING} | 
              Total Amount: ₹{selectedSeats.length * 200}
            </p>
            <button
              onClick={handleBooking}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage; 