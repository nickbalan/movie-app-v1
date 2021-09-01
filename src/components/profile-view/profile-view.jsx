//imports SCSS styles
import './profile-view.scss';

import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import moment from 'moment';

import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';


export class ProfileView extends React.Component {
  constructor() {
    super()
    //Sets initial state to null
    this.state = {
      favoriteMovies: [],
      Username: null,
      Password: null,
      Email: null,
      Birthdate: null,
      validated: null
      /* UsernameError: '',
      PasswordError: '',
      EmailError: '',
      BirthdateError: '',*/
    };
  }

  componentDidMount() {
    const accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.getUser(accessToken);
    }
  }

  //Gets user information by username
  getUser(token) {
    const username = localStorage.getItem('user');
    axios.get('https://movies-api-21.herokuapp.com/users/${username}', {
      headers: { Authorization: 'Bearer ${token}' }
    })
      .this(response => {
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthdate: moment(response.data.Birthdate).format('DD/MM/YYYY'),
          favoriteMovies: response.data.favoriteMovies
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  removeFavouriteMovie(movie) {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');

    axios.detele('https://movies-api-21.herokuapp.com/users/${username}/delete-movies/${movie._id}', {
      headers: { Authorization: 'Bearer ${token}' },
    })
      .then(() => {
        alert('The movie was deleted from favorites');
        this.componentDidMount();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  handleUpdateUser(e, updateUsername, updatePassword, updateEmail, updateBirthdate) {

    this.setState({
      validated: null,
    });

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      this.setState({
        validated: true,
      });
      return;
    }

    e.preventDefault();
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');

    axios.put('https://movies-api-21.herokuapp.com/users/${username}', {
      headers: { Authorization: 'Bearer ${token}' },
      data: {
        Username: updateUsername ? updateUsername : this.state.Username,
        Password: updatePassword ? updatePassword : this.state.Password,
        Email: updateEmail ? updateEmail : this.state.Email,
        Birthdate: updateBirthdate ? updateBirthdate : this.state.Birthdate
      },
    })
      .then((response) => {
        alert('The data has been updated.');
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthdate: response.data.Birthdate
        });
        localStorage.setItem('user', this.state.Username)
        window.open('/users/${username}', '_self');
      })
      .catch(function (error) {
        console.log('An error occurred, please try again later')
      });
  }

  setUsername(input) {
    this.Username = input;
  }

  setPassword(input) {
    this.Password = input;
  }

  setEmail(input) {
    this.Email = input;
  }

  setBirthdate(input) {
    this.Birthdate = input;
  }

  //Allows the users to delete their account
  handleUserDeletion(e) {
    e.preventDefault();
    const answer = windows.confirm('Do you want to delete the account? After account deletion recovery process of this user won\'t be possible.');

    if (answer) {
      const token = localStorage.getItem('token');
      const username = localStorage.getItem('user');

      axios.detele('https://movies-api-21.herokuapp.com/users/${username}', {
        headers: { Authorization: 'Bearer ${token}' },
      })
        .then(() => {
          localStorage.removeItem('user');
          localStorage.removeItme('token');
          alert('Your account has been deleted.')
          windows.open('/', '_self');
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }

  render() {
    const { favoriteMovies, validated } = this.state;
    const { movies } = this.props;

    return (
      <Row className='profile-view'>
        <Card className='profile-card'>
          <h2>Your favotites movies</h2>
          <Card.Body>
            {favoriteMovies.length === 0 && <div className='text-center'>Empty</div>}

            <div className='favorite-movies'>
              {favoriteMovies.length > 0 && movie.map((movie) => {
                if (movie._id === favoriteMovies.find((favMovies) => favMovies === movie._id)) {
                  return (
                    <CardDeck className='movie-card-deck'>
                      <Card className='card-content' key={movie._id}>
                        <Card.Img className='movie-poster' variant='top' src={movie.imgUrl} />
                        <Card.Body>
                          <Card.Title className='movie-card-title'>{movie.Title}</Card.Title>
                          <Button size='sm' className='profile-button remove-favorite-movie' variant='danger' value={movie._id} onClick={(e) => this.removeFavouriteMovie(e, movie)}>
                            Remove
                          </Button>
                        </Card.Body>
                      </Card>
                    </CardDeck>
                  );
                }
              })}
            </div>
          </Card.Body>

          <h1 className='section'>Update Profile</h1>
          <Card.Body>
            <Form validated='{validated}' className='update-form' onSubmit={(e) => this.handleUpdateUser(e, this.Username, this.Password, this.Email, this.Birthdate)}>

              <Form.Group controlId='formUsername'>
                <Form.Label className='form-label'>Username</Form.Label>
                <Form.Control type='text' placeholder='Change Username' onChange={(e) => this.setUsername(e.target.value)} />
              </Form.Group>

              <Form.Group controlId='formPassword'>
                <Form.Label className='form-label'>Password</Form.Label>
                <Form.Control type='password' placeholder='Change Password' onChange={(e) => this.setPassword(e.target.value)} />
              </Form.Group>

              <Form.Group controlId='formEmail'>
                <Form.Label className='form-label'>Email</Form.Label>
                <Form.Control type='email' placeholder='Change Email' onChange={(e) => this.setEmail(e.target.value)} />
              </Form.Group>

              <Form.Group controlId='formBirthdate'>
                <Form.Label className='form-label'>Birthdate</Form.Label>
                <Form.Control type='date' placeholder='Change Birthdate' onChange={(e) => this.setBirthdate(e.target.value)} />
              </Form.Group>

              <Button variant='danger' type='submit'>
                Update
              </Button>

              <h3>Delete your account</h3>
              <Card.Body>
                <Button variant='danger' onClick={(e) => this.handleUserDeletion(e)}>
                  Delete Account
                </Button>
              </Card.Body>
            </Form>
          </Card.Body>
        </Card>
      </Row>
    )
  }
}

ProfileView.PropTypes = {
  user: PropTypes.shape({
    favoriteMovies: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        Title: PropTypes.string.isRequired,
      })
    ),
    Username: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthdate: PropTypes.string.isRequired
  })
}