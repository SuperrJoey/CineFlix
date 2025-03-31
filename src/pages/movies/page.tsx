import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Key } from "lucide-react";

interface Movie {
    MovieId: number;
    Title: string;
    Duration: number;
    Genre: string;
    Rating: number;
    poster_url: string;
}

interface GenreGroup {
    genre: string;
    movies: Movie[];
}

export const Movies = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);
    const [genreGroups, setgenreGroups] = useState<GenreGroup[]>([]);
    const rowRefs = useRef<{[key: string]: HTMLDivElement | null}>({});

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

    useEffect(() => {
        if (movies.length > 0) {
            const sortedByRating = [...movies].sort((a, b) => b.Rating - a.Rating);
            const topRated = sortedByRating.slice(0,10);

            const genreMap: {[key: string]: Movie[]} = {};

            movies.forEach(movie => {
                if (!genreMap[movie.Genre]) {
                    genreMap[movie.Genre] = [];
                }
                genreMap[movie.Genre].push(movie);
            });

            const groups: GenreGroup[] = [
                { genre: "Top Rated", movies: topRated  }
            ];

            Object.keys(genreMap).forEach(genre => {
                groups.push({ genre, movies: genreMap[genre] });
            });

            setgenreGroups(groups);
        }
    }, [movies]);

    const scrollRow = (direction: 'left' | 'right', genre: string) => {
        const row = rowRefs.current[genre];
        if (row) {
            const scrollAmount = 320;
            if (direction === 'left') {
                row.scrollBy({ left: -scrollAmount, behavior: 'smooth'});
            } else {
                row.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        }
    };

    console.log(movies);
    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-950 via-black to-black flex items-center justify-center">
                <p className="text-white text-xl">Loading movies..</p>
            </div>
        )
    }
    

    return (
        <div className="min-h-screen bg-gradient-to-br
        from-green-950 via-black to-black">
            <div className="absolute inset-0 bg-gradient-to-r from-green-950/20 to-black/20 pointer-events-none">
            </div>
        <div className="container mx-auto p-4 py-20 ">
            <h1 className="text-3xl font-bold text-white text-center mb-8">
                Explore Movies
            </h1>

            {genreGroups.map((group) => (
                <div key={group.genre} className="mb-18">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-2xl font-semibold text-white">
                            {group.genre}
                        </h2>
                    </div>
                    <div className="relative">
                        {group.movies.length > 5 && (
                    <button 
                     onClick={() => scrollRow('left', group.genre)}
                    className="bg-gray-700 opacity-80 hover:bg-gray-800 absolute left-0 top-1/2 -translate-y-1/2 z-10 text-white p-2 rounded-full"
                    >
                        <ChevronLeft size={30}/>
                    </button>
                        )}
                    <div
                        ref={(el) => { rowRefs.current[group.genre] = el }}
                        className="flex overflow-x-auto pb-4 hide-scrollbar space-x-4 relative"
                        style={{ scrollbarWidth: 'none' }}
                    >
                        {group.movies.map(movie => (
                            <Link 
                                key={`${group.genre}-${movie.MovieId}`}
                                to={`/${movie.MovieId}`}
                                className="flex-shrink-0 w-48 group relative bg-transparent border-[#6A7077]
                                border rounded-[15px] p-3 mt-3 shadow-lg transform transition hover:scale-105 hover:shadow-xl"
                            >
                                <div>
                                    <img src={movie.poster_url}
                                        alt={movie.Title}
                                        className="w-full h-full object-cover rounded-lg group-hover:opacity-80 transition" 
                                    />
                                    <div className="absolute inset-0 bg-black bg-opacity-30 rounded-lg
                                    opacity-0 group-hover:opacity-100 transition"></div>
                                </div>
                                <h3 className="text-lg font-semibold text-white mt-2 truncate">
                                    {movie.Title}
                                </h3>
                                <p className="text-gray-400 mt-2 text-sm">{movie.Duration}mins</p>
                            </Link>
                        ))}
                       </div>
                       {group.movies.length > 5 && (
                         <button
                                className="bg-gray-700 opacity-80 hover:bg-gray-800 absolute text-white p-2 rounded-full right-0 top-1/2 trasnform -translate-y-1/2 z-10"
                                onClick={() => scrollRow('right', group.genre)}
                            >
                                <ChevronRight size={30}/>                                
                            </button>
                       )}
                    </div>
                </div>
            ))}


            </div>
        </div>
    )
    
}
