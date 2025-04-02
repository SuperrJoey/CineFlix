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

const MovieDetails = () => {

  const { id } = useParams<{id: string}>();

  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:5000/api/movies/${id}`);
        if (!res) {
          throw new Error('Failed to fetch movie form database');
        }
        console.log("fetched res from id: ", res);
        
        setMovie(res.data);
      } catch (error) {
        console.log("Error fetching movies: ", error);
      }
      setLoading(false);
    };
    fetchMovies();
  }, [])

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-green-950
    via-black to-black">
      <div className="absolute inset-0 bg-gradient-to-br from-green-950/20 to-black/20 pointer-events-none">
        <div className="p-4 py-20 mx-auto">
          <div className="flex justify-between">
        <h1 className="text-3xl font-bold text-white">
          {movie?.Title}
        </h1>
        <h2 className="text-xl text-white pr-4">
          ⭐{movie?.Rating} / 10
        </h2>
          </div>
        <p className="text-sm font-semibold text-gray-400">
          {movie?.Genre}
        </p>
        <p className="text-xl font-semibold text-gray-200">
          {movie?.overview}
        </p>
        </div>
      </div>
    </div>
  )
}

export default MovieDetails