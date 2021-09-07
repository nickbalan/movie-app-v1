//imports SCSS styles 
import './login-view.scss';

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


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
        // alert('Incorrect email or password')
        console.log('No such user')
      });
  };

  //  const handleRegister = () => {
  //   let register = false
  //   props.sendReg(register);
  //}

  return (
    <div className='login'>
      <Form className='justify-content-center'>
        <Form.Group className='mb-3' controlId='formUsername'>
          <Form.Label>Username:</Form.Label>
          <Form.Control required type='text' placeholder='Enter your Username' value={username} onChange={e => registerUsername(e.target.value)} />
        </Form.Group>
        <Form.Group className='mb-3' controlId='formPassword'>
          <Form.Label>Password:</Form.Label>
          <Form.Control required type='password' placeholder='Enter your Password' value={password} onChange={e => registerPassword(e.target.value)} />
        </Form.Group>
        <Button variant='primary' type='submit' value='Submit' onClick={handleSubmit}>Log in</Button>
        <Link to={'/register'}>
          <Button variant='secondary' type='link' value='Link'>Sing up</Button>
        </Link>
      </Form>
    </div>
  )
}

LoginView.propTypes = {
  /* sendReg: PropTypes.func.isRequired,
  onLoggedIn: PropTypes.func.isRequired */
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
  }),
  onLoggedIn: PropTypes.func.isRequired
}