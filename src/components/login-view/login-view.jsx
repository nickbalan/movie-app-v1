//imports SCSS styles 
import './login-view.scss';

import React, { useState } from 'react';
//import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';

import Form from 'react-bootstrap/Form';

//imports Material UI components
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
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

export function LoginView(props) {
  const [username, registerUsername] = useState('');
  const [password, registerPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // prevents the default refresh/change of the page from the handleSubmit() method
    // Sends a request to the server for authentication
    axios.post('https://movies-api-21.herokuapp.com/login', {
      Username: username,
      Password: password
    })
      .then(response => {
        const data = response.data;
        props.onLoggedIn(data); // allows a user to be automatically logged in
      })
      .catch(e => {
        console.log('No such user')
      });
  };
  
  return (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box 
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign in <br/><br/>
          </Typography>
          <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }} className='login'>
            <Form className='justify-content-center'>
              <Form.Group className='mb-3' controlId='formUsername'>
                <Form.Label>Username:</Form.Label>
                <Form.Control required type='text' placeholder='Enter your Username' value={username} onChange={e => registerUsername(e.target.value)} />
              </Form.Group>
              <Form.Group className='mb-3' controlId='formPassword'>
                <Form.Label>Password:</Form.Label>
                <Form.Control required type='password' placeholder='Enter your Password' value={password} onChange={e => registerPassword(e.target.value)} />
              </Form.Group>
              <Button 
                type='submit'
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2 }} 
                onClick={handleSubmit}
              >
                Log in
              </Button> 
            </Form>
            <Link href='/register' variant='body2'>
              {"Don't have an account? Sign Up"}
            </Link>
            <Copyright sx={{ mt: 8, mb: 4 }} />
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

const mapDispatchToProps = (dispatch) => ({
  handleSubmit: (username, password) => dispatch(handleSubmit(username, password))
});

export default connect(null, mapDispatchToProps)(LoginView);