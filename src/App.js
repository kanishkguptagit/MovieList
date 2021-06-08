import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {

  const [movies, setMovies] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);

  async function fetchMoviesHandler() {

    setIsLoading(true);
    setIsError(null);

    try{
      const response = await fetch("https://swapi.dev/api/films/");

      if(!response.ok){
        throw new Error('Something went wrong...');
      }

      const data = await response.json();
  
      const transformedData = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        };
      });
  
      setMovies(transformedData);
    }
    catch (error) {
      setIsError(error.message);
    }
    setIsLoading(false);
  }

  let content = <p>Found no movies.</p>

  if(movies.length>0){
    content = <MoviesList movies={movies} />
  }

  if(isError){
    content = <p>{isError}</p>
  }

  if(isloading){
    content = <p>Loading...</p>
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {content}
      </section>
    </React.Fragment>
  );
}

export default App;
