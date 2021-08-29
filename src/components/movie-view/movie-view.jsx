//imports SCSS styles
import './movie-view.scss';

import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';


export class MovieView extends React.Component {

  /* keypressCallback(event) {
    console.log(event.key);
  } */

  constructor() {
    super();
    //Sets initial state to null
    this.state = {
      favoriteMovies: [],
    }
  }

  componentDidMount() {
    const accessToken = localStorage.getItem('token');
    this.getFavorites(accessToken);
  }

  getFavorites(token) {
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
  }

  addFavorites() {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');

    axios.post('https://movies-api-21.herokuapp.com/users/:Username/add-movies/${this.props.movie._id}', {
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
    const { favoriteMovies } = this.state;

    return (
      <Row>
        <Col>
          <img className='movie-img' src={movie.imgUrl} />
        </Col>
        <Col>
          <div className='movie-view'>
            <h2>{movie.Name}</h2>
            <div>
              <p>
                <span className='label'>Title: </span>
                <span className='value'>{movie.Title}</span>
              </p>
              <p>
                <span className='label'>Description: </span>
                <span className='value'>{movie.Description}</span>
              </p>
              <p>
                <span className='label'>Director: </span>
                <span className='value'>{movie.Director.Name}</span>
                <Link to={'/genres/${movieV.Director.Name}'}>
                  <span>{movie.Director.Name}</span>
                </Link>
              </p>
              <p>
                <span className='label'>Genre: </span>
                <Link to={'/genres/${movie.Genre.Name}'}>
                  <span>{movie.Genre.Name}</span>
                </Link>
              </p>
            </div>
            <div className='view-buttons'>
              <button onClick={() => { onBackClick(null); }}>Back</button>
              {(favoriteMovies.indexOf(movie._id) === -1) &&
                <button value={movie.id} onClick={e => this.addFavorites(e, movie)}>Add to Favorites</button>
              }
              {(favoriteMovies.includes(movie._id)) &&
                <button value={movie.id} onClick={e => this.removeFavorites(e, movie)}>Remove from Favorites</button>
              };
            </div>
          </div>
        </Col>
      </Row>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Featured: PropTypes.bool.isRequired,
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
  user: PropTypes.shape({
    favoriteMovies: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        Name: PropTypes.string.isRequired
      })
    )
  })
}