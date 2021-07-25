import React from 'react';
import PropTypes from 'prop-types';
import './movie-view.scss';
import Button from 'react-bootstrap/Button';

export class MovieView extends React.Component {

  render() {
    const { movieV, onBackClick } = this.props;
    return (
      <div className='movie-view'>
        <div className='movie-poster'>
          <img src={movieV.imgUrl} />
        </div>
        <div className='movie-title'>
          <span className='label'>Title: </span>
          <span className='value'>{movieV.Title}</span>
        </div>
        <div className='movie-description'>
          <span className='label'>Description: </span>
          <span className='value'>{movieV.Description}</span>
        </div>
        <div className='movie-genre'>
          <span className='label'>Genre: </span>
          <span className='value'>{movieV.Genre.Name}</span>
        </div>
        <div className='movie-director'>
          <span className='label'>Director: </span>
          <span className='value'>{movieV.Director.Name}</span>
        </div>
        <Button onClick={() => { onBackClick(null); }} varinat='secondary' className='my-3'>Back</Button>
      </div >
    );
  }
}

MovieView.propTypes = {
  movieV: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired
    }),
    Featured: PropTypes.bool.isRequired,
    imgUrl: PropTypes.string.isRequired
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
}