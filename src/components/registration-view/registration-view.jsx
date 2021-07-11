import React from 'react';
import PropTypes from 'prop-types';

export function RegistrationView() {
  const username = '';
  const password = '';
  const email = '';
  const birthday = '';

  function sendRegister() {
    alert('Thank you for signing up.')
    let register = true
    props.sendReg(register);
  }

  return (
    <>
      <form>
        <h1>Registration</h1>
        <label>
          Username:
          <input type='text' />
        </label>
        <label>
          Password:
          <input type='password' />
        </label>
        <label>
          Email:
          <input type='email' />
        </label>
        <label>
          Birthday:
          <input type='date' />
        </label>
      </form>
      <button type='submit' onClick={sendRegister}>Submit</button>
    </>
  );
}

RegistrationView.PropTypes = {
  sendReg: PropTypes.func.isRequired
}