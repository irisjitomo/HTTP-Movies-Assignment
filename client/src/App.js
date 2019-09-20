import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdatedMovie from './Movies/UpdatedMovie'
import axios from 'axios'

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movies, setMovies] = useState([]);

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/`)
      .then(res => {
        setMovies(res.data)
      })
      .catch(err => console.log(err))
  }, [])
  console.log(movies)

  return (
    <>
      <SavedList list={savedList} />
      <Route exact path="/" component={MovieList} />
      <Route
        path="/movies/:id"
        render={props => {
          return <Movie {...props} addToSavedList={addToSavedList} updateMovie={setMovies}/>;
        }}
      />
      <Route 
        path='/edit-movie/:id' 
        render={props => {
          return <UpdatedMovie {...props} addToSavedList={addToSavedList} movies={movies} updateMovie={setMovies}/>;
        }}/>
    </>
  );
};

export default App;
