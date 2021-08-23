//imports SCSS styles 
import './login-view.scss';

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import FloatingLabel from 'react-bootstrap/FormLabel';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // prevents the default refresh/change of the page from the handleSubmit() method
    // Sends a request to the server for authentication
    axios.post('https://movies-api-21.herokuapp.com/users', {
      Username: username,
      Password: password
    })
      .then(response => {
        const data = response.data;
        props.onLoggedIn(data); // allows a user to be automatically logged in
      })
      .catch(e => {
        alert('Incorrect email or password')
        console.log('No such user')
      });
  };

  //  const handleRegister = () => {
  //   let register = false
  //   props.sendReg(register);
  //}

  return (
    <div className='login-view'>
      <Form className='login-from'>
        <Form.Group className='mb-3' controlId='formUsername' value={username} onChange={e => setUsername(e.target.value)}>
          <FloatingLabel controlId='floatingUsername' label='Username' className='mb-3'>
            <Form.Control required type='text' placeholder='Username' />
          </FloatingLabel>
        </Form.Group>
        <Form.Group className='mb-3' controlId='formPassword' value={password} onChange={e => setPassword(e.target.value)}>
          <FloatingLabel controlId='floatingPassword' label='Password' className='mb-3'>
            <Form.Control required type='password' placeholder='Password' />
          </FloatingLabel>
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
  //onLoggedIn: PropTypes.func.isRequired
}