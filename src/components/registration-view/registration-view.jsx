//imports SCSS styles
import './registration-view.scss';

import React, { useState } from 'react';
import axios from 'axios';

import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';

//imports Material UI components
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';


export function RegistrationView() {
  const [username, registerUsername] = useState('');
  const [password, registerPassword] = useState('');
  const [email, registerEmail] = useState('');
  const [birthdate, registerBirthdate] = useState('');

  const [usernameError, registerUsernameError] = useState({});
  const [passwordError, registerPasswordError] = useState({});
  const [emailError, registerEmailError] = useState({});
  const [birthdateError, registerBirthdateErorr] = useState({});

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

  const handleRegister = (e) => {
    e.preventDefault();
    let isValidated = validationForm();
    if (isValidated) {
      axios.post('https://movies-api-21.herokuapp.com/users', {
        Username: username,
        Password: password,
        Email: email,
        Birthdate: birthdate
      })
        .then(response => {
          const data = response.data;
          console.log(data);
          windows.open('/', '_self'); //opens the page in the current tab.
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  const validationForm = () => {
    let usernameError = {};
    let passwordError = {};
    let emailError = {};
    let birthdateError = {};
    let isValid = true;

    if (username.trim().length < 6) {
      usernameError.notValidUsername = 'Username must be at least 6 characters.'
      isValid = false;
    }
    if (password.trim().length < 12 || password === '') {
      passwordError.notValidPassword = 'Password must be at least 12 characters.'
      isValid = false;
    }
    if (!(email && email.includes('.') && email.indexOf('@'))) {
      emailError.notValidEmail = 'Please enter a valid email address';
      isValid = false;
    }
    if (birthdate === '') {
      birthdateError.notValidBirthdate = 'Please enter your date of birth.'
      isValid = false;
    }

    registerUsernameError(usernameError);
    registerPasswordError(passwordError);
    registerEmailError(emailError);
    registerBirthdateErorr(birthdateError);
    return isValid;
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
            Sign up <br/><br/>
          </Typography>
          <Box component='form' noValidate onSubmit={handleRegister} sx={{ mt: 3 }}>
            <Form className='register justify-content-md-center'>
              <Row>
                <Form.Group controlId='formUsername'>
                  <Form.Label>Enter your username</Form.Label>
                  <Form.Control type='text' value={username} onChange={e => registerUsername(e.target.value)} />
                  {Object.keys(usernameError).map((key) => {
                    return (
                      <div key={key}>
                        {usernameError[key]}
                      </div>
                    );
                  })}
                </Form.Group>
              </Row>
              <Row>
                <Form.Group controlId='formPassword'>
                  <Form.Label>Enter your password</Form.Label>
                  <Form.Control type='password' value={password} onChange={e => registerPassword(e.target.value)} />
                  {Object.keys(passwordError).map((key) => {
                    return (
                      <div key={key}>
                        {passwordError[key]}
                      </div>
                    );
                  })}
                </Form.Group>
              </Row>
              <Row>
                <Form.Group controlId='formEmail'>
                  <Form.Label>Email</Form.Label>
                  <Form.Control type='email' value={email} onChange={e => registerEmail(e.target.value)} />
                  {Object.keys(emailError).map((key) => {
                    return (
                      <div key={key}>
                        {emailError[key]}
                      </div>
                    );
                  })}
                </Form.Group>
              </Row>
              <Row>
                <Form.Group controlId='formBirthdate'>
                  <Form.Label>Enter your date of birth</Form.Label>
                  <Form.Control type='date' value={birthdate} onChange={e => registerBirthdate(e.target.value)} />
                  {Object.keys(birthdateError).map((key) => {
                    return (
                      <div key={key}>
                        {birthdateError[key]}
                      </div>
                    );
                  })}
                </Form.Group>
              </Row>
              <Button
                type='submit'
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2 }}
                onClick={handleRegister}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href='/' variant='body2'>
                    {'Already have an account? Sign in'}
                  </Link>
                </Grid>
              </Grid>
            </Form>
            <Copyright sx={{ mt: 8, mb: 4 }} />
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}