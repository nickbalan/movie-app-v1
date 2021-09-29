//imports SCSS styles 
import './main-view.scss';

import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { setMovies } from '../../actions/actions';

import MoviesList from '../movie-list/movie-list';

import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';
import { NavBar } from '../navbar-view/navbar-view';

class MainView extends React.Component {

  constructor() {
    super();
    //Sets initial state to null
    this.state = {
      user: null
    };
  }

  //Checks if the user is logged in, if he is logged in, then uses his token
  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

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

  //Gets all the movies from external DB
  getMovies(token) {
    axios.get('https://movies-api-21.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        //Assigns the result to the state
        this.props.setMovies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    let { movies } = this.props;
    let { user } = this.state;

    return (
      <div className='main-view'>
        <Router>
          <NavBar user={user} />
          <Row className='main-view justify-content-md-center'>
            <Route exact path='/' render={() => {
              if (!user) return <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
              if (movies.length === 0) return <div className='main-view' />;
              return <MoviesList movies={movies} />;
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
              return <Col md={8}>
                <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
              </Col>
            }} />

            <Route path='directors/:Name' render={({ match, history }) => {
              if (!user) return <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
              if (movies.length === 0) return <div className='main-view' />;
              return <Col md={8}>
                <DirectorView director={movies.find(m => m.Director.Name === match.params.Name).Director} onBackClick={() => history.goBack()} />
              </Col>
            }} />

            <Route path='genres/:Name' render={({ match, history }) => {
              if (!user) return <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
              if (movies.length === 0) return <div className='main-view' />;
              return <Col md={8}>
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

let mapStateToProps = state => {
  return { movies: state.movies }
}

export default connect(mapStateToProps, { setMovies })(MainView);