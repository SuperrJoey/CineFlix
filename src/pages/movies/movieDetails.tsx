import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

interface Movie {
  Title: string;
  Duration: number;
  Genre: string;
  Rating: number;
  poster_url: string;
  overview: string;
  revenue: number;
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
  seats?: {
    SeatID: number;
    SeatNumber: number;
    screenID: number;
    AvailabilityStatus: string;
  }[];
}

export const MovieDetails = () => {
  const { id } = useParams<{id: string}>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [showtimes, setShowtimes] = useState<Showtime []>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showContent, setShowContent] = useState(false);


  useEffect(() => {
    const fetchMovieAndShowtimes = async () => {
      try {
        setLoading(true);
        const [movieRes, showtimeRes] = await Promise.all([
          axios.get(`http://localhost:5000/api/movies/${id}`),
          axios.get(`http://localhost:5000/api/showtimes/movie/${id}`),
        ]);

        setMovie(movieRes.data);
        setShowtimes(showtimeRes.data);
      } catch (error) {
        console.error("Fetch error: ", error);
        setError("Failed to load movie details");
      } finally {
        setLoading(false);
        const timer = setTimeout(() => setShowContent(true), 500);
      }
    };
    fetchMovieAndShowtimes();

  }, [id])

  const getBookingStatus = (showtime: Showtime) => {
    if (!showtime.seats) return { available: false, trending: false };
    const total = showtime.seats.length;
    const booked = showtime.seats.filter(seat => seat.AvailabilityStatus === 'booked').length;

    return {
      available: booked < total,
      trending: booked / total > 0.5,
    };
  };

  const formatShowtime = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    };
    return date.toLocaleDateString('en-US', options);
  };

  if (!showContent || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-950 via-black to-black flex items-center justify-center py-20">
        <div className="w-full max-w-4xl space-y-6 animate-pulse">
          {/* //poster */}
          <div className="h-72 w-full bg-green-900/30 rounded-lg"></div>
        
        {/* title */}
          <div className="flex justify-center items-center">
            <div className="h-8 w-1/2 bg-green-900/30 rounded"></div>
            <div className="h-6 w-24 bg-green-900/30 rounded-full"></div>
          </div>

        {/* Genre duration */}
          <div className="flex gap-4">
            <div className="h-6 w-24 bg-green-900/30 rounded"></div>
            <div className="h-6 w-28 bg-green-900/30 rounded-full"></div>
          </div>
          
          {/* overview */}
          <div className="space-y-3">
            <div className="h-4 bg-green-900/30 rounded w-3/4"></div>
            <div className="h-4 bg-green-900/30 rounded w-5/6"></div>
          </div>

          <div>
            {[1 , 2, 3].map((_, i) => (
              <div key={i} className="h-16 bg-green-900/30 rounded-lg"></div>
            ))}
          </div>
        
        </div>
      </div>
    )
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-950 via-black to-black flex items-center justify-center">
        <p>{error || "Movie not found"}</p>
      </div>
    )
  }

  const hasShowtimes = showtimes.length > 0;

  return (
  <div className={`transition-opacity duration-700 ease-in-out ${showContent ? 'opacity-100' : 'opacity-0'}`}>  
    <div className="min-h-screen bg-gradient-to-br from-green-950 via-black to-black py-20">
      <div className="absolute inset-0 bg-gradient-to-br from-green-950/20 to-black/20 pointer-events-none" />

        <div className="container mx-auto px-4 py-8 relative z-10">
          <div className="flex flex-col md:flex-row gap-8">
            {/* left */}
            <div className="w-full md:w-1/3 lg:w-1/4">
              <div className="rounded-lg overflow-hidden shadow-2xl">
                <img 
                  src={movie.poster_url} 
                  alt={movie.Title}
                  className="w-full h-auto object-cover" 
                  />
              </div>
            </div>
            {/* right */}
            <div className="flex-1 space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h1 className="text-4xl font-bold text-white">{movie.Title}</h1>
                
              </div>

              <div className="flex flex-wrap gap-4">
                <div className="bg-green-900/30 px-4 py-2 rounded-full">
                  <span className="text-gray-300">{movie.Genre}</span>
                </div>
                <div className="bg-green-900/30 px-4 py-2 rounded-full">
                  <span className="text-gray-300">{movie.Duration} mins</span>
                </div>
                <div className="bg-green-900/30 px-4 py-2 rounded-full">
                  <span className="text-yellow-400">⭐</span>
                  <span className="text-white font-semibold">{movie.Rating}/10 </span>
                </div>
                <div className="bg-black/40 p-6 rounded-lg backdrop-blur-sm">
              <h2 className="text-xl font-semibold text-white mb-3">Overview</h2>
              <p className="text-gray-300 leading-relaxed">
                {movie.overview}
              </p>
            </div>

            <div className="bg-black/40 p-4 rounded-lg backdrop-blur-sm">
              <h2 className="text-lg font-semibold text-white mb-4">Showtimes</h2>
              {hasShowtimes ? (
                <div className="space-y-3">
                  {showtimes.map((showtime) => {
                    const { available, trending } = getBookingStatus(showtime);
                    return (
                      <div key={showtime.ShowtimeID} className="flex flex-col sm:flex-row sm:items-center justify-between bg-green-900/20 p-4 rounded-lg gap-3">
                        <div className="space-y-1">
                          <p className="text-white font-medium">
                            {formatShowtime(showtime.StartTime)}
                          </p>
                          <div className="flex items-center gap-1.5">
                            <span className="text-gray-400 text-sm">Screen</span>
                            <span className="text-white text-sm">{showtime.screenID}</span>
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                          {trending && (
                            <span className="bg-red-500/20 text-red-400 px-3 py-1.5 rounded-full text-sm">
                              🔥 Trending
                            </span>
                          )}
                          <button
                            className={`w-full sm:w-auto px-6 py-2 rounded-full font-medium transition-all text-sm
                              ${available 
                                ? 'bg-green-600 hover:bg-green-700 text-white' 
                                : 'bg-gray-600 text-gray-300 cursor-not-allowed'}`}
                            disabled={!available}
                          >
                            {available ? 'Book Now' : 'Sold Out'}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-400">No showtimes available at the moment</p>
                  <p className="text-gray-500 text-sm mt-2">Please check back later for updates</p>
                </div>
              )}
            </div>

              </div>
            </div>
          </div>
        </div>
    </div>
    </div>
  )
}