//imports SCSS styles
import './movie-card.scss';

import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';



export class MovieCard extends React.Component {

  render() {
    const { movie } = this.props;

    return (
      <Card bg='secondary' text='white'>
        <Link to={'/movie/${movie._id}'}>
          <Card.Img variant='top' src={movie.imgUrl} />
        </Link>
        <Card.Body>
          <Card.Title>
            <h3>{movie.Title}</h3>
          </Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <Link to={'/movie/${movie._id}'}>
            <Button variant='primary'>Open</Button>
          </Link>
        </Card.Body>
      </Card>
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