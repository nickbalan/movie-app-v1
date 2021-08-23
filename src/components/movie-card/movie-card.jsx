//imports SCSS styles
import './movie-card.scss';

import React from 'react';
import PropTypes from 'prop-types';

import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';


export class MovieCard extends React.Component {

  render() {
    const { movie } = this.props;

    return (
      <Link to={'/movie/${movie._id}'}>
        <Card key={movie._id} variant='light'>
          <Card.Img variant='top' src={movie.imgUrl} />
          <Card.Body>
            <Card.Title>
              <h3>{movie.Name}</h3>
            </Card.Title>
          </Card.Body>
        </Card>
      </Link>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string,
      Description: PropTypes.string
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string,
      Bio: PropTypes.string,
      Birth: PropTypes.string,
      Death: PropTypes.string
    }),
    Featured: PropTypes.bool.isRequired,
    imgUrl: PropTypes.string.isRequired
  }).isRequired,
  //onMovieClick: PropTypes.func.isRequired
};