import React from 'react';
import PropTypes from 'prop-types';
import './movie-card.scss';
import Button from 'react-bootstrap/Button';
import { Card } from 'react-bootstrap';


export class MovieCard extends React.Component {

  render() {
    const { movie, onMovieClick } = this.props;

    return (
      <Card style={{ width: '20rem' }}>
        <Card.Img variant='top' src={movie.imgUrl} />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <div className='movie-card'>
            <Button onClick={() => { onMovieClick(movie); }}>{movie.Title}</Button>
          </div>
        </Card.Body>
      </Card>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    /* Genre: PropTypes.shape({
      Name: PropTypes.string
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string
    }), */
    Featured: PropTypes.bool.isRequired,
    imgUrl: PropTypes.string.isRequired
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};