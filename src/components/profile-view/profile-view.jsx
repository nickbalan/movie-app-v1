//imports SCSS styles
import './profile-view.scss';

import React from 'react';
import axios from 'axios';
import moment from 'moment';
import { connect } from 'react-redux';

import { setUser, updateUser } from '../../actions/actions';

//imports React Bootstrap components
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import Badge from 'react-bootstrap/Badge';

//imports Material UI components
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

export class ProfileView extends React.Component {
  constructor() {
    super()
    this.state = {
      favoriteMovies: [],
      Username: null,
      Password: null,
      Email: null,
      Birthdate: null,
      validated: null
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
    axios.get(`https://movie-api-production-57fd.up.railway.app/users/${username}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        //console.log(response);
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthdate: moment(response.data.Birthdate).format('DD/MM/YYYY'),
          favoriteMovies: response.data.FavoriteMovies
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  removeFavouriteMovie(movie) {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');

    axios.delete(`https://movie-api-production-57fd.up.railway.app/users/${username}/delete-movies/${movie}`, {
      headers: { Authorization: `Bearer ${token}` },
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

    axios.put(`https://movie-api-production-57fd.up.railway.app/users/${username}`, {
      headers: { Authorization: `Bearer ${token}` },
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
        console.log(error)
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

      axios.delete(`https://movie-api-production-57fd.up.railway.app/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
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
    let { movies } = this.props;

    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container disableGutters maxWidth='sm' component='main' sx={{ pt: 8, pb: 6 }}>
          <Card>
            <Card.Body>
              <Typography
                variant='h4'
                align='center'
                color='text.primary'
                gutterBottom
              >
                Update Profile
              </Typography>
              <Form noValidate 
                validated={validated} 
                onSubmit={(e) => this.handleUpdateUser(e, this.Username, this.Password, this.Email, this.Birthdate)}
              >
                <Form.Group controlId='formUsername'>
                  <Form.Label>Username</Form.Label>
                  <Form.Control 
                    type='text' 
                    placeholder='Change Username' 
                    onChange={(e) => this.setUsername(e.target.value)} />
                </Form.Group>
                <Form.Group controlId='formPassword'>
                  <Form.Label>Password</Form.Label>
                  <Form.Control 
                    type='password' 
                    placeholder='Change Password' 
                    onChange={(e) => this.setPassword(e.target.value)} />
                </Form.Group>
                <Form.Group controlId='formEmail'>
                  <Form.Label>Email</Form.Label>
                  <Form.Control 
                    type='email' 
                    placeholder='Change Email' 
                    onChange={(e) => this.setEmail(e.target.value)} />
                </Form.Group>
                <Form.Group controlId='formBirthdate'>
                  <Form.Label>Date of birth</Form.Label>
                  <Form.Control 
                    type='date' 
                    onChange={(e) => this.setBirthdate(e.target.value)} />
                </Form.Group>
                <Box sx={{ '& button': { m: 1 } }}>
                  <Button 
                    variant='outlined' 
                    size='medium'
                  >
                    Update
                  </Button>
                  <Button 
                    variant='outlined' 
                    size='medium'
                    onClick={(e) => this.handleUserDeletion(e)}
                  >
                    Delete Account
                  </Button>
                </Box>
              </Form>
            </Card.Body>
          </Card>
          </Container>
          <Container disableGutters 
            maxWidth='sm' 
            component='main' 
            sx={{ pt: 4, pb: 2 }}
          >
            <Typography
              variant='h4'
              align='center'
              color='text.primary'
              gutterBottom
            >
              My favorite movies
            </Typography>
          </Container>
          <Container sx={{ py: 6 }} maxWidth='md'>
            {favoriteMovies.length === 0 && 
              <Typography
              variant='h6'
              align='center'
              color='text.primary'
              gutterBottom
              >
                Your favotites movies list is empty
              </Typography>}
              <Box sx={{ '& button': { m: 2 } }}>
                <Grid container spacing={2}>
                
                {favoriteMovies.length > 0 && movies.map((movie) => {
                  if (movie._id === favoriteMovies.find((favMovies) => favMovies === movie._id)) {
                    return (
                        <Card sx={{ height: 'auto', width: '200px', display: 'flex', flexDirection: 'column'}}>
                          <Card.Img className='movie-card' variant='top' src={movie.imgUrl} />
                          <Card.Title align='center'>{movie.Title}</Card.Title>
                          <Button variant='outlined' size='sm' className='profile-button remove-favorite-movie' value={movie._id} onClick={() => this.removeFavouriteMovie(movie._id)}>
                            Remove from Favorites
                          </Button>
                        </Card>
                    );
                  }
                })}
                
                </Grid>
              </Box>
          </Container>
          
          
          
      </ThemeProvider>  
    )
  }
}

let mapStateToProps = state => {
  return {
    user: state.user,
    movies: state.movies
  }
}

export default connect(mapStateToProps, { setUser, updateUser })(ProfileView);