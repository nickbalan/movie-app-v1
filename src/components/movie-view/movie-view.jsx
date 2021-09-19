//imports SCSS styles
import './movie-view.scss';

import React from 'react';
//import PropTypes from 'prop-types';
import axios from 'axios';

import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
//import Badge from 'react-bootstrap/Badge';


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

    axios.post(`https://movies-api-21.herokuapp.com/users/${username}/add-movies/${this.props.movie._id}`, {}, {
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

    axios.delete(`https://movies-api-21.herokuapp.com/users/:Username/add-movies/${this.props.movie._id}`, {
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
            <Badge bg='primary'>
              <span className='value'>{movie.Title}</span>
            </Badge>
          </h1>
        </div>
        <div className='movie-description'>
          <span className='label'>Description: </span>
          <span className='value'>{movie.Description}</span>
        </div>
        <div className='movie-director'>
          <Link to={`/directors/${movie.Director.Name}`}>Director: </Link>
          <span className='value'>{movie.Director.Name}</span>
        </div>
        <div className='movie-genre'>
          <Link to={`/genres/${movie.Genre.Name}`}>Genre: </Link>
          <span className='value'>{movie.Genre.Name}</span>
        </div>
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