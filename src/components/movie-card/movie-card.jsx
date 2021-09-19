//imports SCSS styles
import './movie-card.scss';

import React from 'react';
import axios from 'axios';

import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';


export class MovieCard extends React.Component {

  addFavorite() {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');

    axios.put(`https://movies-api-21.herokuapp.com/users/${username}/add-movies/${this.props.movie._id}`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        //Assigns the result to the state
        alert('This movie was added to the Favorites List');
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const { movie } = this.props;

    return (
      <Container>
        <Card bg='secondary' text='white'>
          <Link to={`/movies/${movie._id}`}>
            <Card.Img variant='top' src={movie.imgUrl} />
          </Link>
          <Card.Body className='fav-btn' style={{ paddingLeft: 30, margin: 'auto' }}>
            <Button variant='dark' value={movie._id} onClick={(e) => this.addFavorite(e, movie)}>
              Add Favorites
            </Button>
          </Card.Body>
        </Card>
      </Container>
    );
  }
}