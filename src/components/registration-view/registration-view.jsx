//imports SCSS styles
import './registration-view.scss';

import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FloatingLabel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FormGroup } from 'react-bootstrap';

export function RegistrationView() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const [usernameError, registerUsernameError] = useState('');
  const [passwordError, registerPasswordError] = useState('');
  const [emailError, registerEmailError] = useState('');
  const [birthdayError, registerBirthdayErorr] = useState('');

  /* function sendRegister() {
    alert('Thank you for signing up.')
    let register = true
    props.sendReg(register);
  } */

  const handleRegister = (e) => {
    e.preventDefault();
    const isValidated = validationForm();
    if (isValidated) {
      axios.post('https://movies-api-21.herokuapp.com/users', {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday
      })
        .then(response => {
          const data = response.data;
          console.log(data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  const validationForm = () => {
    const usernameError = {};
    const passwordError = {};
    const emailError = {};
    const birthdayError = {};
    let isValidated = true;

    if (username.length < 4 || username === '') {
      usernameError.notValidUsername = 'Username must be at least 4 characters.'
      isValidated = false;
    }
    if (password.length < 8 || password === '') {
      passwordError.notValidPassword = 'Password must be at least 6 characters.'
      isValidated = false;
    }
    if (!email || email.indexOf('@') === -1) {
      emailError.notValidEmail = 'Please enter a valid email address';
      isValidated = false;
    }
    if (!birthday) {
      birthdayError.notValidBirthday = 'Please enter your date of birth.'
      isValidated = false;
    }

    registerUsernameError(usernameError);
    registerPasswordError(passwordError);
    registerEmailError(emailError);
    registerBirthdayErorr(birthdayError);
    return isValidated;
  };

  return (
    <div className='registration-view'>
      <Form className='registration-form'>
        <Form.Group className='mb2'>
          <Form.Text>
            Enter your information
          </Form.Text>
        </Form.Group>
        <Form.Group className='mb-3' controlId='emailForm'>
          {Object.keys(emailError).map((key) => {
            return (
              <div className='form-validation' key={key}>
                {emailError[key]}
              </div>
            );
          })}
          <FloatingLabel label='Email' className='mb-3' type='email'>
            <Form.Control required type="email" placeholder='Email address' value={email} onChange={e => registerEmail(e.target.value)} />
          </FloatingLabel>
        </Form.Group>

        <FormGroup className='mb-3' contralId='usernameForm'>
          {Object.keys(usernameError).map((key) => {
            return (
              <div className='form-validation' key={key}>
                {usernameError[key]}
              </div>
            );
          })}
          <FloatingLabel label='Username' className='mb-3'>
            <Form.Control required type='text' placeholder='Username' value={username} onChange={e => registerUsername(e.target.value)} />
          </FloatingLabel>
        </FormGroup>

        <FormGroup className='mb-3' contralId='passwordForm'>
          {Object.keys(passwordError).map((key) => {
            return (
              <div className='form-validation' key={key}>
                {usernameError[key]}
              </div>
            );
          })}
          <FloatingLabel label='Password' className='mb-3'>
            <Form.Control required type='password' placeholder='Password' value={password} onChange={e => registerPassword(e.target.value)} />
          </FloatingLabel>
        </FormGroup>

        <FormGroup className='mb-3' contralId='birthdayForm'>
          {Object.keys(birthdayError).map((key) => {
            return (
              <div className='form-validation' key={key}>
                {birthdayError[key]}
              </div>
            );
          })}
          <FloatingLabel label='Birthday' className='mb-3'>
            <Form.Control required type='date' placeholder='Birthday' value={birthday} onChange={e => registerBirthday(e.target.value)} />
          </FloatingLabel>
        </FormGroup>

        <Button type='button' variant='primary' onClick={handleRegister}>
          Submit
        </Button>
        <Link to={'/'}>
          <Button type='button' variant='secondary'>
            Back
          </Button>
        </Link>
      </Form>
    </div>
  );
}

RegistrationView.propTypes = {
  user: PropTypes.shape({
    Email: PropTypes.string.isRequired,
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Birthday: PropTypes.string.isRequired
  })
}