//imports SCSS styles
import './movie-view.scss';

//imports React components and libraries
import React from 'react';
import axios from 'axios';

//imports React Bootstrap components
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';

//imports Material UI components
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

function Copyright(props) {
  return (
    <Typography variant='body2' color='text.secondary' align='center' {...props}>
      {'Copyright © '}
      <Link color='inherit' href='/'>
        Movie App v1
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

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

    axios.put(`https://movie-api-production-57fd.up.railway.app/users/${username}/add-movies/${this.props.movie._id}`, {}, {
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

    axios.delete(`https://movie-api-production-57fd.up.railway.app/users/${username}/delete-movies/${this.props.movie._id}`, {
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
        <div className='director-des'>
          <span className='value'>Director: {movie.Director[0]}</span>
        </div>
        <div className='genre-des'>
          <span className='value'>Genre: {movie.Genre[0]}</span>
        </div>
        </div>
        <div className='movie-des'>
          <span className='value'>{movie.Description}</span>
        </div>
        <br/>
        <Button variant='success' className='favorite-btn' value={movie._id} onClick={(e) => this.addFavorite(e, movie)}>
          Add to Favorites
        </Button>
        <Button variant='success' className='favorite-btn' value={movie._id} onClick={(e) => this.removeFavorites(e, movie)}>
          Remove from Favorites
        </Button>
        <Button variant='primary' className='favorite-btn' onClick={() => { onBackClick(null); }}>Back</Button>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </div>
    );
  }
}