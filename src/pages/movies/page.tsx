import { useState, useEffect } from "react";
import axios from "axios";

interface Movie {
  id: number;
  name: string;
  duration: number; // in minutes
  genre: string;
  rating: number;
}

const Movies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/movies");
        setMovies(response.data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
      setLoading(false);
    };

    fetchMovies();
  }, []);

  if (loading) {
    return <p>Loading movies...</p>;
  }

  return (
    <div className="p-20 min-h-screen bg-gradient-to-br
        from-green-950 via-black to-black">
      <h2 className="text-2xl font-bold mb-4">Movies</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2 text-white">Name</th>
            <th className="border border-gray-300 px-4 py-2 text-white">Duration (min)</th>
            <th className="border border-gray-300 px-4 py-2 text-white">Genre</th>
            <th className="border border-gray-300 px-4 py-2 text-white">Rating</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie.id} className="hover:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2 text-white">{movie.name}</td>
              <td className="border border-gray-300 px-4 py-2 text-white">{movie.duration} min</td>
              <td className="border border-gray-300 px-4 py-2 text-white">{movie.genre}</td>
              <td className="border border-gray-300 px-4 py-2 text-white">{movie.rating}/10</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Movies;
