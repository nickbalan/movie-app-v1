//imports SCSS styles
import './registration-view.scss';

import React, { useState } from 'react';
import axios from 'axios';

import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';


export function RegistrationView() {
  const [username, registerUsername] = useState('');
  const [password, registerPassword] = useState('');
  const [email, registerEmail] = useState('');
  const [birthdate, registerBirthdate] = useState('');

  const [usernameError, registerUsernameError] = useState({});
  const [passwordError, registerPasswordError] = useState({});
  const [emailError, registerEmailError] = useState({});
  const [birthdateError, registerBirthdateErorr] = useState({});


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
          windows.open('/', '_self'); //the '_self' argument opens the page in the current tab.
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
    <Form className="register justify-content-md-center">
      <Row>
        <Form.Group controlId='formUsername'>
          <Form.Label>Username: </Form.Label>
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
          <Form.Label>Password: </Form.Label>
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
          <Form.Label>Email: </Form.Label>
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
          <Form.Label>Birthdate: </Form.Label>
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

      <span>
        <Button type='submit' onClick={handleRegister}>Sign Up</Button>
        <Link to='/'>
          <Button variant='secondary'>Back</Button>
        </Link>
      </span>
    </Form>
  );
}