//imports SCSS styles 
import './main-view.scss';

import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
// import { Link } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
//import Container from 'react-bootstrap/Container';
//import Navbar from 'react-bootstrap/Navbar';
//import { NavbarBrand } from 'react-bootstrap';

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';


class MainView extends React.Component {

  constructor() {
    super();
    //Sets initial state to null
    this.state = {
      movies: [],
      user: null,
      //selectedMovie: null,
      //regStatus: null
    };
  }

  //Checks if the user is logged in, if he is logged in, then uses his token
  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    //let user = localStorage.getItem('user')
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      //this.props.setUser(user);
      this.getMovies(accessToken);
    }
  }

  /* setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  } */

  //Updates the user's state on logged in
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    //Stores the token and username in local storage
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  //Deletes stored user and token from local storage on logging out
  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    //this.props.setUser(user);
    //localStorage.clear();
    this.setState({
      user: null
    });
  }

  isRegistered(register) {
    this.setState({
      register: register,
    });
  }

  //Gets all the movies from external DB
  getMovies(token) {
    axios.get('https://movies-api-21.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        //Assigns the result to the state
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  /* //Gets users recent data from external DB
  getUsers(token) {
    axios.post('https://movies-api-21.herokuapp.com/users', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        //Assign the result to a state
        this.setState({
          users: response.data
        });
        console.log(response)
      })
      .catch(function (error) {
        console.log(error);
      });
  } */

  render() {
    const { movies, user } = this.state;
    /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/
    /* if (!user && isRegistered) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} sendReg={rStatus => this.registerStatus(rStatus)} />
    if (!user && !isRegistered) return <RegistrationView sendReg={rStatus => this.registerStatus(rStatus)} />
    if (movies.length === 0) return <div className='main-view' />; */

    return (
      <div className='main-view'>
        <Router>
          {/* <Navbar>
            <Container>
              <NavbarBrand>
                <Link to={'/'}>
                  <h1>myFlix Client API</h1>
                </Link>
              </NavbarBrand>
              <Navbar.Text>
                <Link to={'/users/${user}'}>
                  <p>{user}</p>
                </Link>
              </Navbar.Text>
              <button onClick={() => {
                this.onLoggedOut();
              }}>
                Logout
              </button>
            </Container>
          </Navbar> */}

          <Row className='main-view justify-content-md-center'>
            <Route exact path='/' render={() => {
              if (!user) return (
                <Col>
                  <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                </Col>
              );
              if (movies.length === 0) return <div className='main-view' />;
              return movies.map(movie => (
                <Col xs={12} md={6} lg={4} key={movie._id}>
                  <MovieCard movie={movie} />
                </Col>
              ));
            }} />

            <Route path='/register' render={() => {
              if (user) return <Redirect to='/' />
              return <Col>
                <RegistrationView />
              </Col>
            }} />

            <Route path='/profile' render={() => {
              if (!user) return <Col>
                <ProfileView />
              </Col>
            }} />

            <Route path='/movies/:movieId' render={({ match, history }) => {
              if (!user) return <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
              if (movies.length === 0) return <div className='main-view' />;
              return <Col>
                <MovieView movie={movies.find(movie => movie._id === match.params.movieId)} onBackClick={() => history.goBack()} />
              </Col>
            }} />

            <Route path='directors/:Name' render={({ match, history }) => {
              if (user) return <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
              if (movies.length === 0) return <div className='main-view' />;
              return <Col>
                <DirectorView director={movies.find(movie => movie.Director.Name === match.params.Name).Director} onBackClick={() => history.goBack()} />
              </Col>
            }} />

            <Route path='genres/:Name' render={({ match, history }) => {
              if (user) return <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
              if (movies.length === 0) return <div className='main-view' />;
              return <Col>
                <GenreView genre={movies.find(movie => movie.Genre.Name === match.params.Name).Genre} onBackClick={() => history.goBack()} />
              </Col>
            }} />

            <Route exact path='/users/:Username' render={({ history }) => {
              if (!user) return <LoginView onLoggedIn={(data) => this.onLoggedIn(data)} />
              if (movies.length === 0) return;
              return <ProfileView history={history} movies={movies} />
            }} />
          </Row>
        </Router>
      </div>
    );
  }
}

export default MainView;