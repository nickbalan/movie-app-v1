import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './login-view.scss';
import { Button, Form } from 'react-bootstrap';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // prevents the default refresh/change of the page from the handleSubmit() method
    console.log(username, password);
    // Sends a request to the server for authentication
    props.onLoggedIn(username); // allows a user to be automatically logged in
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