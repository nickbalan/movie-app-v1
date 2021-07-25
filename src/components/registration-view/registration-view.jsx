import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import './registration-view.scss';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export function RegistrationView() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  function sendRegister() {
    alert('Thank you for signing up.')
    let register = true
    props.sendReg(register);
  }

  return (
    <>
      <h1>Registration</h1>
      <Form>
        <Form.Group controlId='formUsername'>
          <Form.Label>Username:</Form.Label>
          <Form.Control type='text' onChange={e => setUsername(e.target.value)} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password:</Form.Label>
          <Form.Control type='password' onChange={e => setPassword(e.target.value)} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Email:</Form.Label>
          <FormControl type='email' onChange={e => setEmail(e.target.value)} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Birthday:</Form.Label>
          <FormControl type='date' onChange={e => setBirthday(e.target.value)} />
        </Form.Group>
      </Form>
      <Button variant='primary' type='submit' onClick={sendRegister}>Submit</Button>
    </>
  );
}

RegistrationView.propTypes = {
  sendReg: PropTypes.func.isRequired
}