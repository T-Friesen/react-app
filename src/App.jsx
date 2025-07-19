// all key images in the application is stored in the public directory. Movie posters are gathered via the API.
// importing tools and components to use
import { useEffect, useState } from 'react'
import { useDebounce } from 'react-use'
import Search from './components/Search'
import MovieCard from './components/MovieCard'
import { SyncLoader } from "react-spinners";

// set the base url for the api calls
const API_BASE_URL = 'https://api.themoviedb.org/3';

// get the api keys that are stored in the .env.local file
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

// get the api options for the api
const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}

// the start of the application
const App = () => {
  // setting the initial states of the application variables
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Debounce the search term so that the api isn't getting called every button press
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  useDebounce(() => setDebouncedSearchTerm(searchTerm), 1000, [searchTerm])

  // fetch movies based on a search query or load popular movies if nothing is being queried
  const fetchMovies = async (query = '') => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      const endpoint = query ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`: `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

      const response = await fetch(endpoint, API_OPTIONS);

      if(!response.ok) {
        throw new Error('Failed to fetch movies.')
      }

      const data = await response.json();
      
      setMovieList(data.results || []);

    } catch(error){
      console.log(`Error fetching movies: ${error}`);
      setErrorMessage(`Error fetching movies. Please try again later.`)
    } finally {
      setIsLoading(false);
    }
  }

  // use effect to fetch movies using the debounced search term
  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  // return the application with or without the search term, if no search term give popular movies, otherwise return the movies related to the search term
  return (
    <><div className='pattern' />
    
    <div className='wrapper'>
        <header>
            <img src="./Hero.png" alt="Hero Banner" />
            <h1>Find <span className='text-gradient'>Movies</span> You'll Enjoy Without The Hassel!</h1>
            
            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        <section className="all-movies">
          <h2 className='mt-[20px] text-5xl'>All Movies</h2>

          {isLoading ? (<p className='text-white text-3xl'>Loading <span><SyncLoader color="#d8b9ff" /></span></p>) : errorMessage ? (<p className='text-red-500'>{errorMessage}</p>) : (<ul>
            {movieList.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </ul>)}

        </section>
    </div></>
    
  )
}

export default App