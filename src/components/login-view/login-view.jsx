import React, { useState } from 'react';
import PropTypes from 'prop-types';

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
      <form>
        <label>
          Username:
          <input type='text' value={username} onChange={e => setUsername(e.target.value)} />
        </label>
        <label>
          Password:
          <input type='password' value={password} onChange={e => setPassword(e.target.value)} />
        </label>
        <button type='submit' onClick={handleSubmit}>Submit</button>
      </form>
      <button onClick={handleRegister}>Registration</button>
    </>
  );
}

LoginView.propTypes = {
  sendReg: PropTypes.func.isRequired,
  onLoggedIn: PropTypes.func.isRequired
}