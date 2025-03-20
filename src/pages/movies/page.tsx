import { useState, useEffect } from "react";
import axios from "axios";

interface Movie {
  name: string;
}


const Movies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/movies"); //Fetch movies
        
        console.log(response.data);
        
        setMovies(response.data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
      setLoading(false);
    };

    fetchMovies();
  }, []);

  return (
    <div>{movies.map((movie) => (
      <p>
        {movie.name}
      </p>
    ))}</div>
  )
}

export default Movies