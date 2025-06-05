import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { format, addDays, isSameDay } from 'date-fns';
import PageWrapper from '../../components/pageWrapper';

interface Movie {
  movieid: number;
  title: string;
  genre: string;
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

interface GroupedShowtimes {
  [movieId: string]: {
    movie: Movie;
    showtimes: Showtime[];
  };
}

const Seats = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [movies, setMovies] = useState<Movie[]>([]);
  const [showtimes, setShowtimes] = useState<Showtime[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);

  // Generate 7 days starting from today
  const dates = Array.from({ length: 7 }, (_, i) => addDays(new Date(), i));

  useEffect(() => {
    // Get user role
    const role = localStorage.getItem('user');
    setUserRole(role);

    const fetchMoviesAndShowtimes = async () => {
      try {
        setLoading(true);
        const [moviesResponse, showtimesResponse] = await Promise.all([
          axios.get('http://localhost:5000/api/movies'),
          axios.get('http://localhost:5000/api/showtimes')
        ]);

        setMovies(moviesResponse.data);
        setShowtimes(showtimesResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load movies and showtimes');
      } finally {
        setLoading(false);
      }
    };

    fetchMoviesAndShowtimes();
  }, []);

  // Group showtimes by movie for the selected date
  const groupedShowtimes: GroupedShowtimes = {};
  showtimes.forEach(showtime => {
    const showtimeDate = new Date(showtime.starttime);
    if (isSameDay(showtimeDate, selectedDate)) {
      if (!groupedShowtimes[showtime.movieid]) {
        const movie = movies.find(m => m.movieid === showtime.movieid);
        if (movie) {
          groupedShowtimes[showtime.movieid] = {
            movie,
            showtimes: []
          };
        }
      }
      if (groupedShowtimes[showtime.movieid]) {
        groupedShowtimes[showtime.movieid].showtimes.push(showtime);
      }
    }
  });

  const handleShowtimeClick = (screenId: number, showtimeId: number) => {
    console.log("Showtime clicked:", { screenId, showtimeId });
    
    // Route based on user role
    if (userRole === 'admin') {
      navigate(`/admin/booking/${screenId}/${showtimeId}`);
    } else {
      navigate(`/booking/${screenId}/${showtimeId}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-950 via-black to-black py-20">
        <div className="container mx-auto px-4">
          <div className="text-white text-center">Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-950 via-black to-black py-20">
        <div className="container mx-auto px-4">
          <div className="text-white text-center">{error}</div>
        </div>
      </div>
    );
  }

  return (
  <PageWrapper>

    <div className="min-h-screen bg-gradient-to-br from-green-950 via-black to-black py-20">
      <div className="container mx-auto px-4">
        {/* User Role Indicator for Admin */}
        {userRole === 'admin' && (
          <div className="bg-yellow-500/20 text-yellow-300 text-center py-2 px-4 rounded-lg mb-6">
            Admin View - You will see seat occupancy details when clicking a showtime
          </div>
        )}
        
        {/* Date Selection */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-8">
          {dates.map((date) => (
            <button
              key={date.toString()}
              onClick={() => setSelectedDate(date)}
              className={`flex-shrink-0 px-6 py-3 rounded-lg transition-colors ${
                isSameDay(date, selectedDate)
                  ? 'bg-green-600 text-white'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <div className="text-sm font-semibold">
                {format(date, 'EEE')}
              </div>
              <div className="text-2xl font-bold">
                {format(date, 'd')}
              </div>
              <div className="text-sm">
                {format(date, 'MMM')}
              </div>
            </button>
          ))}
        </div>

        {/* Movies and Showtimes */}
        <div className="space-y-8">
          {Object.values(groupedShowtimes).map(({ movie, showtimes }) => (
            <div key={movie.movieid} className="bg-white/5 rounded-lg p-6">
              <div className="mb-4">
                <h2 className="text-2xl font-bold text-white">{movie.title}</h2>
                <div className="flex gap-4 text-gray-400 text-sm mt-2">
                  <span>{movie.genre}</span>
                  <span>•</span>
                  <span>{movie.duration} mins</span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {showtimes
                  .sort((a, b) => new Date(a.starttime).getTime() - new Date(b.starttime).getTime())
                  .map((showtime) => (
                    <button
                      key={showtime.showtimeid}
                      onClick={() => handleShowtimeClick(showtime.screenid, showtime.showtimeid)}
                      className={`
                        rounded-lg p-4 transition-colors
                        ${userRole === 'admin' 
                          ? 'bg-yellow-500/20 hover:bg-yellow-500/40 text-white' 
                          : 'bg-white/10 hover:bg-white/20 text-white'}
                      `}
                    >
                      <div className="text-lg font-semibold">
                        {format(new Date(showtime.starttime), 'hh:mm a')}
                      </div>
                      <div className="text-sm text-gray-400 mt-1">
                        Screen {showtime.screenid}
                      </div>
                      {userRole === 'admin' && (
                        <div className="text-xs text-yellow-300 mt-1">
                          View Occupancy
                        </div>
                      )}
                    </button>
                  ))}
              </div>
            </div>
          ))}

          {Object.keys(groupedShowtimes).length === 0 && (
            <div className="text-center text-white py-8">
              <p className="text-xl">No shows available on this date</p>
              <p className="text-gray-400 mt-2">Please select a different date</p>
            </div>
          )}
        </div>
      </div>
    </div>
  </PageWrapper>
  );
};

export default Seats;