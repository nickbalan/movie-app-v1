import React from 'react';
import PropTypes from 'prop-types';
import './movie-view.scss';

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
        <button onClick={() => { onBackClick(null); }}>Back</button>
      </div >
    );
  }
}

MovieView.propTypes = {
  movieV: PropTypes.shape({
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
  onBackClick: PropTypes.func.isRequired
}