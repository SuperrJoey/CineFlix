import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { format, addDays, isSameDay } from 'date-fns';

interface Movie {
  MovieID: number;
  Title: string;
  Genre: string;
  Duration: number;
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

  // Generate 7 days starting from today
  const dates = Array.from({ length: 7 }, (_, i) => addDays(new Date(), i));

  useEffect(() => {
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
    const showtimeDate = new Date(showtime.StartTime);
    if (isSameDay(showtimeDate, selectedDate)) {
      if (!groupedShowtimes[showtime.MovieID]) {
        const movie = movies.find(m => m.MovieID === showtime.MovieID);
        if (movie) {
          groupedShowtimes[showtime.MovieID] = {
            movie,
            showtimes: []
          };
        }
      }
      if (groupedShowtimes[showtime.MovieID]) {
        groupedShowtimes[showtime.MovieID].showtimes.push(showtime);
      }
    }
  });

  const handleShowtimeClick = (screenId: number, showtimeId: number) => {
    navigate(`/booking/${screenId}/${showtimeId}`);
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
    <div className="min-h-screen bg-gradient-to-br from-green-950 via-black to-black py-20">
      <div className="container mx-auto px-4">
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
            <div key={movie.MovieID} className="bg-white/5 rounded-lg p-6">
              <div className="mb-4">
                <h2 className="text-2xl font-bold text-white">{movie.Title}</h2>
                <div className="flex gap-4 text-gray-400 text-sm mt-2">
                  <span>{movie.Genre}</span>
                  <span>•</span>
                  <span>{movie.Duration} mins</span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {showtimes
                  .sort((a, b) => new Date(a.StartTime).getTime() - new Date(b.StartTime).getTime())
                  .map((showtime) => (
                    <button
                      key={showtime.ShowtimeID}
                      onClick={() => handleShowtimeClick(showtime.screenID, showtime.ShowtimeID)}
                      className="bg-white/10 hover:bg-white/20 text-white rounded-lg p-4 transition-colors"
                    >
                      <div className="text-lg font-semibold">
                        {format(new Date(showtime.StartTime), 'hh:mm a')}
                      </div>
                      <div className="text-sm text-gray-400 mt-1">
                        Screen {showtime.screenID}
                      </div>
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
  );
};

export default Seats;