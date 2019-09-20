import React, {useState, useEffect} from 'react';

import axios from 'axios';



  const UpdatedMovie = (props) => {
      
    const initialMovieDetails = {
        id: `${props.match.params.id}`,
        title: '',
        director: '',
        metascore: '',
        stars: [],
      }; 

      const [detail, setDetail] = useState(initialMovieDetails);

      useEffect(() => {
          const id = props.match.params.id;
          const detailUpdate = props.movies.find(movie => {
              return `${movie.id}` === id;
          })
          console.log(detailUpdate);
          if (detailUpdate) {
              setDetail(detailUpdate);
          }
      }, [props.match.params.id, props.movies])


      const handleChange = e => {
          e.persist();
          setDetail({
              ...detail,
              [e.target.name] : e.target.value
          })
      }

      const submit = e => {
          e.preventDefault();
          console.log(detail)
          axios.put(`http://localhost:5000/api/movies/${props.match.params.id}`, detail)
          .then(res => {
            //   props.updateMovie(res.data);
              setDetail(initialMovieDetails);
              props.history.push(`/movies/${props.match.params.id}`)
              console.log(res)})
          .catch(err => console.log(err))
      }

    return (
        <div>
            <h2>Edit Movie</h2>
            <form onSubmit={submit}>
                <input 
                name="title" 
                placeholder="Title" 
                onChange={handleChange}
                value={detail.title}/>

                <input 
                name='director'
                placeholder="Director" 
                onChange={handleChange}
                value={detail.director}/>

                <input 
                name='metascore' 
                type='number' 
                placeholder="Metascore" 
                onChange={handleChange}
                value={detail.metascore}/>

                <input 
                name="stars" 
                placeholder="Stars" 
                onChange={handleChange}
                value={detail.stars}/>
                <button>Finish Editing</button>
            </form>
        </div>
    )
  }

  export default UpdatedMovie