import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

interface Movie {
    MovieId: number;
    Title: string;
    Duration: number;
    Genre: string;
    Rating: number;
    poster_url: string;
}

export const Movies = () => {
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
    }, [])

    console.log(movies);
    if (loading) {
        return <p>Loading movies...</p>
    }
    

    return (
        <div className="min-h-screen bg-gradient-to-br
        from-green-950 via-black to-black">
            <div className="absolute inset-0 bg-gradient-to-r from-green-950/20 to-black/20 pointer-events-none">
            </div>
        <div className="container mx-auto p-4 py-20 ">
            <h1 className="text-3xl font-bold text-white text-center mb-8">
                Explore Movies
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                    {movies.map(movie => (
                        <Link 
                        className="mt-5 group relative bg-transparent border-[#6A7077] border rounded-[15px] p-3 shadow-lg
                        transform transition hover:scale-105 hover:shadow-xl"
                        key={movie.MovieId} to={`/${movie.MovieId}`}>
                            <div className="relative">
                                <img 
                                className="w-22 h-22 objext-cover rounded-lg group-hover:opacity-80 transition"
                                src={movie.poster_url}/>
                                <div className="absolute inset-0 bg-black bg-opacity-30 rounded-lg
                                opacity-0 group-hover:opacity-100 transition"></div>
                            </div>
                            <h2 className="text-lg font-semibold text-white mt-2">
                                {movie.Title}
                            </h2>
                            <p className="text-gray-400 mt-2 text-sm">{movie.Duration}mins</p>
                            <p className="text-gray-400 mt-2 text-sm">Genre - {movie.Genre}</p>
                            <p className="text-yellow-400 font-medium text-sm mt-3">{movie.Rating}⭐/10</p>
                        </Link>
                    ))}
                </div>
            </h1>
        </div>
        </div>
    )

}