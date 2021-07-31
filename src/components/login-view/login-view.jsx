import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './login-view.scss';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';

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
        console.log('No such user')
      });
  };

  const handleRegister = () => {
    let register = false
    props.sendReg(register);
  }

  return (
    <>
      <Form>
        <Form.Group className='mb-3' controlId='formUsername'>
          <Form.Label>Username:</Form.Label>
          <Form.Control type='text' onChange={e => setUsername(e.target.value)} />
        </Form.Group>
        <Form.Group className='mb-3' controlId='formPassword'>
          <Form.Label>Password:</Form.Label>
          <Form.Control type='password' onChange={e => setPassword(e.target.value)} />
        </Form.Group>
        <Button variant='primary' type='submit' value='Submit' onClick={handleSubmit}>Submit</Button>
      </Form>
      <Button variant='secondary' type='link' value='Link' onClick={handleRegister}>Registration</Button>
    </>
  );
}

LoginView.propTypes = {
  sendReg: PropTypes.func.isRequired,
  onLoggedIn: PropTypes.func.isRequired
}