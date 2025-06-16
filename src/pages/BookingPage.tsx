import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MdEventSeat } from 'react-icons/md';
import axios from 'axios';
import { io, Socket } from 'socket.io-client';
import BookingModal from '../components/BookingModal';

interface Seat {
  seatid: number;
  seatnumber: number;
  screenid: number;
  showtimeid: number;
  availabilitystatus: string;
  bookingid: number | null;
  temporarilyReserved?: boolean;
  reservedByMe?: boolean;
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

interface SeatReservation {
  seatId: number;
  socketId: string;
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingDetails, setBookingDetails] = useState({
    movieName: '',
    poster: '',
    showtimeDate: '',
    showtimeTime: '',
    screen: 0,
    seatNumbers: [],
    duration: 0
  });
  const socketRef = useRef<Socket | null>(null);
  const MAX_SEATS_PER_BOOKING = 4;

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/signin');
      return;
    }
    setIsAuthenticated(true);

    // Initialize Socket.IO connection
    socketRef.current = io('http://localhost:5000');
    
    const socket = socketRef.current;

    // Setup socket event listeners
    socket.on('connect', () => {
      // Connected to socket server
    });

    socket.on('seat_temporarily_reserved', (data: SeatReservation) => {
      setSeats(prev => prev.map(seat => {
        if (seat.seatid === data.seatId) {
          return {
            ...seat,
            temporarilyReserved: true,
            reservedByMe: data.socketId === socket.id
          };
        }
        return seat;
      }));
    });

    socket.on('seat_reservation_released', (data: SeatReservation) => {
      setSeats(prev => prev.map(seat => {
        if (seat.seatid === data.seatId) {
          return {
            ...seat,
            temporarilyReserved: false,
            reservedByMe: false
          };
        }
        return seat;
      }));
    });

    socket.on('seat_reservation_expired', (data: SeatReservation) => {
      setSeats(prev => prev.map(seat => {
        if (seat.seatid === data.seatId) {
          return {
            ...seat,
            temporarilyReserved: false,
            reservedByMe: false
          };
        }
        return seat;
      }));
      
      // If it was my reservation that expired, remove from selected seats
      if (data.socketId === socket.id) {
        setSelectedSeats(prev => prev.filter(id => id !== data.seatId));
      }
    });

    socket.on('seats_booked', (data: { seatIds: number[], socketId: string }) => {
      setSeats(prev => prev.map(seat => {
        if (data.seatIds.includes(seat.seatid)) {
          return {
            ...seat,
            availabilitystatus: 'booked',
            temporarilyReserved: false,
            reservedByMe: false
          };
        }
        return seat;
      }));
      
      // If these were seats I temporarily selected but someone else booked them, remove from my selection
      if (data.socketId !== socket.id) {
        setSelectedSeats(prev => prev.filter(id => !data.seatIds.includes(id)));
      }
    });

    socket.on('booking_cancelled', (data: { seatIds: number[] }) => {
      setSeats(prev => prev.map(seat => {
        if (data.seatIds.includes(seat.seatid)) {
          return {
            ...seat,
            availabilitystatus: 'available',
            bookingid: null
          };
        }
        return seat;
      }));
    });

    const fetchShowtimeAndSeats = async () => {
      try {
        setLoading(true);
        
        // If we have a showtimeId, use it directly
        if (showtimeId) {
          // Join the socket room for this showtime
          socket.emit('join_showtime', showtimeId);
          
          // Fetch showtime details
          const showtimeResponse = await axios.get(`https://cineflix-be.onrender.com/api/showtimes/${showtimeId}`);
          
          if (showtimeResponse.data) {
            setShowtime(showtimeResponse.data);
            
            // Then fetch seats for this showtime
            const seatsResponse = await axios.get(`https://cineflix-be.onrender.com/api/seats/showtime/${showtimeId}`);
            
            // Process seat data to mark any temporarily reserved seats
            const processedSeats = seatsResponse.data.map((seat: Seat) => ({
              ...seat,
              reservedByMe: seat.temporarilyReserved && false // Will be updated when we know our socket ID
            }));
            
            setSeats(processedSeats);
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
            
            // Join the socket room for this showtime
            socket.emit('join_showtime', currentShowtime.showtimeid);
            
            // Then fetch seats for this showtime
            const seatsResponse = await axios.get(`https://cineflix-be.onrender.com/api/seats/showtime/${currentShowtime.showtimeid}`);
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

    // Cleanup function
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [screenId, showtimeId, navigate]);

  const refreshSeats = async () => {
    if (showtime) {
      try {
        const seatsResponse = await axios.get(`https://cineflix-be.onrender.com/api/seats/showtime/${showtime.showtimeid}`);
        setSeats(seatsResponse.data);
        setSelectedSeats([]); // Clear selection after booking
      } catch (error) {
        console.error("Failed to refresh seats", error);
      }
    }
  };
  
  const handleSeatClick = async (seatId: number) => {
    if (!isAuthenticated || !socketRef.current || !showtime) {
      navigate('/signin');
      return;
    }

    // Check if seat is already booked
    const seat = seats.find(s => s.seatid === seatId);
    if (seat && seat.availabilitystatus === 'booked') {
      return;
    }
    
    // Check if seat is temporarily reserved by someone else
    if (seat && seat.temporarilyReserved && !seat.reservedByMe) {
      alert('This seat is currently selected by another user');
      return;
    }

    const isAlreadySelected = selectedSeats.includes(seatId);
    
    try {
      // Send reservation request to server
      const response = await axios.post(`https://cineflix-be.onrender.com/api/seats/showtime/${showtime.showtimeid}/reserve`, {
        seatId,
        socketId: socketRef.current.id,
        isReserving: !isAlreadySelected
      });
      
      if (response.status === 200) {
        // Update local state only after server confirms
        setSelectedSeats(prev => {
          if (isAlreadySelected) {
            return prev.filter(id => id !== seatId);
          } else {
            // If adding this seat would exceed the limit, show an alert
            if (prev.length >= MAX_SEATS_PER_BOOKING) {
              alert(`You can only book a maximum of ${MAX_SEATS_PER_BOOKING} seats per booking.`);
              return prev;
            }
            return [...prev, seatId];
          }
        });
      }
    } catch (error: any) {
      console.error('Error reserving seat:', error);
      if (error.response?.status === 409) {
        alert('This seat was just selected by another user');
      } else {
        alert('Failed to select seat. Please try again.');
      }
    }
  };

  const handleBooking = async () => {
    if (selectedSeats.length === 0) {
      alert('Please select at least one seat');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token || !showtime || !socketRef.current) return;

      const response = await axios.post(
        `https://cineflix-be.onrender.com/api/seats/showtime/${showtime.showtimeid}/book`,
        { 
          seatIds: selectedSeats,
          socketId: socketRef.current.id
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      // Booking successful

      if (response.status === 201) {
        setBookingDetails({
          movieName: response.data.movieName,
          poster: response.data.poster_url,
          showtimeDate: response.data.showtimeDate,
          showtimeTime: response.data.showtimeTime,
          screen: response.data.screen,
          seatNumbers: response.data.seatIds,
          duration: response.data.Duration
        });
        setIsModalOpen(true);
      } else {
        alert('Booking failed. Please try again.');
      }
    } catch (error: any) {
      console.error('Booking error:', error);
      if (error.response?.status === 409) {
        alert('Some of the selected seats are no longer available. Please refresh and try again.');
        refreshSeats();
      } else {
        alert('Failed to book seats. Please try again.');
      }
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

            <p className="text-gray-300 mt-2">
              Maximum {MAX_SEATS_PER_BOOKING} seats per booking
            </p>
            <p className="text-yellow-400 text-sm animate-pulse mt-1">
              Seats are reserved for 5 minutes once selected
            </p>
          </div>
        )}
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="grid grid-cols-10 gap-2 mb-8">
            {seats.map(seat => (
              <button
                key={seat.seatid}
                onClick={() => handleSeatClick(seat.seatid)}
                disabled={
                  seat.availabilitystatus === 'booked' || 
                  (seat.temporarilyReserved && !seat.reservedByMe) ||
                  (selectedSeats.length >= MAX_SEATS_PER_BOOKING && !selectedSeats.includes(seat.seatid))
                }
                className={`
                  p-2 rounded-lg transition-colors relative
                  ${seat.availabilitystatus === 'booked'
                    ? 'bg-red-500 cursor-not-allowed' 
                    : seat.temporarilyReserved
                      ? seat.reservedByMe
                        ? 'bg-green-500' // My reservation
                        : 'bg-yellow-400 cursor-not-allowed' // Someone else's reservation
                      : selectedSeats.includes(seat.seatid)
                        ? 'bg-green-500' 
                        : selectedSeats.length >= MAX_SEATS_PER_BOOKING
                          ? 'bg-white opacity-50 cursor-not-allowed'
                          : 'bg-white hover:bg-gray-200'
                  }
                  border border-gray-300
                `}
              >
                <MdEventSeat className="w-6 h-6" />
                {seat.temporarilyReserved && !seat.reservedByMe && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="animate-ping absolute h-3 w-3 rounded-full bg-yellow-400 opacity-75"></div>
                    <div className="relative h-2 w-2 rounded-full bg-yellow-500"></div>
                  </div>
                )}
              </button>
            ))}
          </div>

          <div className="flex justify-center gap-6 mb-8 flex-wrap">
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
              <span>Selected by you</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-yellow-400 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="animate-ping absolute h-3 w-3 bg-yellow-400 opacity-75"></div>
                  <div className="relative h-2 w-2 rounded-full bg-yellow-500"></div>
                </div>
              </div>
              <span>Selected by others</span>
            </div>
          </div>

          <div className="text-center">
            <p className="mb-4">
              Selected Seats: {selectedSeats.length} of {MAX_SEATS_PER_BOOKING} | 
              Total Amount: ₹{selectedSeats.length * 200}
            </p>
            <button
              onClick={handleBooking}
              disabled={selectedSeats.length === 0}
              className={`
                px-8 py-3 rounded-lg transition-colors
                ${selectedSeats.length === 0 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-blue-600 text-white hover:bg-blue-700'}
              `}
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
      <BookingModal isOpen={isModalOpen} onClose={() => {
        setIsModalOpen(false);
        refreshSeats(); // Refresh seat data
      }}
      bookingDetails={bookingDetails} />
    </div>
  );
};

export default BookingPage;