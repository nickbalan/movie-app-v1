import React from 'react';
import axios from 'axios';
import './main-view.scss';

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { Col } from 'react-bootstrap';
import { Row } from 'react-bootstrap';

class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      //Sets initial state to null
      movies: [],
      selectedMovie: null,
      user: null,
      isRegistered: true
    };
  }

  componentDidMount() {
    axios.get('https://movies-api-21.herokuapp.com/movies')
      .then(response => {
        this.setState({
          movies: response.data,
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  //Updates the `user` property in state
  onLoggedIn(user) {
    this.setState({
      user
    });
  }

  registerStatus(regStatus) {
    this.setState({
      isRegistered: regStatus
    });
  }

  render() {
    const { movies, selectedMovie, user, isRegistered } = this.state;
    /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/
    if (!user && isRegistered) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} sendReg={rStatus => this.registerStatus(rStatus)} />
    if (!user && !isRegistered) return <RegistrationView sendReg={rStatus => this.registerStatus(rStatus)} />
    if (movies.length === 0) return <div className='main-view' />;

    return (
      <Row className='main-view jutify-content-md-center'>
        {selectedMovie
          ? (
            <Col xs={6}>
              <MovieView movieV={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
            </Col>
          )
          : movies.map(movie => (
            <Col>
              <MovieCard key={movie._id} movie={movie} onMovieClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie); }} />
            </Col>
          ))
        }
      </Row>
    );
  }
}

export default MainView;