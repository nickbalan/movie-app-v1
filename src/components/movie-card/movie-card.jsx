//imports SCSS styles
import './movie-card.scss';

import React from 'react';
import axios from 'axios';

import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
/* import Button from 'react-bootstrap/Button'; */
import Container from 'react-bootstrap/Container';

//imports Material UI components
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
/* import Link from '@mui/material/Link'; */
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';

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

const theme = createTheme();

export class MovieCard extends React.Component {

  addFavorite() {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');

    axios.put(`https://movie-api-22.onrender.com/users/${username}/add-movies/${this.props.movie._id}`, {}, {
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
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container sx={{ py: 6 }} maxWidth='md'>
          <Grid container spacing={2}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column'}}>
              <Link to={`/movies/${movie._id}`}>
                <Card.Img variant='top' src={movie.imgUrl} />
              </Link> 
              <Card.Body className='favorites-btn'>
                <Button variant='dark' value={movie._id} onClick={(e) => this.addFavorite(e, movie)}>
                  Add to Favorites
                </Button>
              </Card.Body>
            </Card> 
          </Grid>
        </Container>
      </ThemeProvider>
    );
  }
}