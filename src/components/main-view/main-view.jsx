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

  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  //Updates the `user` property in state
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  registerStatus(regStatus) {
    this.setState({
      isRegistered: regStatus
    });
  }

  getMovies(token) {
    axios.get('https://movies-api-21.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        this.setState({
          movies: response.data,
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const { movies, selectedMovie, user, isRegistered } = this.state;
    /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/
    if (!user && isRegistered) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} sendReg={rStatus => this.registerStatus(rStatus)} />
    if (!user && !isRegistered) return <RegistrationView sendReg={rStatus => this.registerStatus(rStatus)} />
    if (movies.length === 0) return <div className='main-view' />;

    return (
      <div className='main-view'>
        {selectedMovie
          ? (
            <Row className='main-view jutify-content-md-center'>
              <Col xs={6}>
                <MovieView movieV={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
              </Col>
            </Row>
          )
          : (
            <Row className='main-view jutify-content-md-center'>
              {movies.map(movie => (
                <Col>
                  <MovieCard key={movie._id} movie={movie} onMovieClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie); }} />
                </Col>
              ))}
            </Row>
          )
        }
      </div >
    );
  }
}

export default MainView;