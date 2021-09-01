//imports SCSS styles
import './movie-view.scss';

import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';


export class MovieView extends React.Component {

  /*  constructor() {
   super();
   //Sets initial state to null
   this.state = {
     favoriteMovies: [],
   }
 } */

  keypressCallback(event) {
    console.log(event.key);
  }

  componentDidMount() {
    document.addEventListener('keypress', this.keypressCallback);
  }

  componentWillUnmount() {
    document.removeEventListener('keypress', this.keypressCallback);
  }

  /* getFavorites(token) {
    const username = localStorage.getItem('user');
    const favoriteMovies = this.state;

    axios.get('https://movies-api-21.herokuapp.com/users/${username}', {
      headers: { Authorization: 'Bearer ${token}' }
    })
      .then(response => {
        this.setState({
          favoriteMovies: response.data.favoriteMovies,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  } */

  addFavorites() {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');

    axios.post('https://movies-api-21.herokuapp.com/users/${username}/add-movies/${this.props.movie._id}', {}, {
      headers: { Authorization: 'Bearer ${token}' }
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

    axios.delete('https://movies-api-21.herokuapp.com/users/:Username/add-movies/${this.props.movie._id}', {
      headers: { Authorization: 'Bearer ${token}' }
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
          <Link to={'/directors/${{movie.Director.Name}'}>
            <Button variant='link'>Director: </Button>
          </Link>
          <span className='value'>{movie.Director.Name}</span>
        </div>
        <div className='movie-genre'>
          <Link to={'/genres/${movie.Genre.Name}'}>
            <Button variant='link'>Genre: </Button>
          </Link>
          <span className='value'>{movie.Genre.Name}</span>
        </div>
        <Button variant='danger' className='fav-button' value={movie._id} onClick={(e) => this.addFavorites(e, movie)}>
          Add to Favorites
        </Button>
        <Button variant='primary' onClick={() => { onBackClick(null); }}>Back</Button>
      </div>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Featured: PropTypes.bool,
    imgUrl: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string.isRequired,
      Death: PropTypes.string.isRequired
    })
  }).isRequired,
};