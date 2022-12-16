//imports SCSS styles
import './movie-card.scss';

//imports React components and libraries
import React from 'react';
import axios from 'axios';

//imports React Bootstrap components
import Badge from 'react-bootstrap/Badge';

//imports React Router components
import { Link } from 'react-router-dom';

//imports React Bootstrap components
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';

//imports Material UI components
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

export class MovieCard extends React.Component {

  addFavorite() {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');

    axios.put(`https://movie-api-production-57fd.up.railway.app/users/${username}/add-movies/${this.props.movie._id}`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
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
            <Card sx={{ 
              height: 'auto', 
              width: '200px', 
              display: 'flex', 
              flexDirection: 'column'}}>
              <Badge className="badge badge-light">
                <Typography 
                  variant='body2' 
                  color='text.secondary' 
                  align='center'
                >
                  {movie.Title}
                </Typography>
              </Badge>
              <Link to={`/movies/${movie._id}`}>
                <Card.Img variant='top' src={movie.imgUrl} />
              </Link>
              <Card.Body className='center'>
                <Link className='cards' to={`/movies/${movie._id}`}>
                  <Button 
                    variant='outlined' 
                    size='medium'
                  >
                    Details
                  </Button>
                </Link> 
                <Button 
                  className='cards' 
                  size='small' 
                  value={movie._id} 
                  onClick={(e) => this.addFavorite(e, movie)}
                >
                  <FavoriteIcon color="secondary" />
                </Button>
              </Card.Body>
            </Card> 
          </Grid>
        </Container>
      </ThemeProvider>
    );
  }
}