//imports SCSS styles
import './movie-view.scss';

import React from 'react';
import axios from 'axios';

//import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
//import { GenreView } from '../genre-view/genre-view';


export class MovieView extends React.Component {


  keypressCallback(event) {
    console.log(event.key);
  }

  componentDidMount() {
    document.addEventListener('keypress', this.keypressCallback);
  }

  componentWillUnmount() {
    document.removeEventListener('keypress', this.keypressCallback);
  }

  addFavorite() {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');

    axios.put(`https://movies-api-21.herokuapp.com/users/${username}/add-movies/${this.props.movie._id}`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        alert('This movie was added to the Favorites List')
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  removeFavorites() {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');

    axios.delete(`https://movies-api-21.herokuapp.com/users/${username}/delete-movies/${this.props.movie._id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        alert('This movie was deleted from the Favorites List')
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const { movie, onBackClick } = this.props;
    
    return (
      
      <div className='movie-view'>
        <div className='movie-poster'>
          <img src={movie.imgUrl} />
        </div>
        <div className='movie-title'>
          <h1>
            <Badge className="badge badge-light">
              <span className='value'>{movie.Title}</span>
            </Badge>
          </h1>
        <div className='movie-director'>
          <span className='value'>Director: {movie.Director[0]}</span>
        </div>
        <div className='movie-genre'>
          <span className='value'>Genre: {movie.Genre[0]}</span>
        </div>
        </div>
        <div className='movie-description'>
          <span className='value'>{movie.Description}</span>
        </div>
        <br/>
        <Button variant='success' className='fav-button' value={movie._id} onClick={(e) => this.addFavorite(e, movie)}>
          Add to Favorites
        </Button>
        <Button variant='success' className='fav-button' value={movie._id} onClick={(e) => this.removeFavorites(e, movie)}>
          Remove from Favorites
        </Button>
        <Button variant='primary' onClick={() => { onBackClick(null); }}>Back</Button>
      </div>
    );
  }
}