//imports SCSS styles
import './profile-view.scss';

import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import moment from 'moment';

import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { render } from 'react-dom';


export class ProfileView extends React.Component {
  constructor() {
    super()
    //Sets initial state to null
    this.state = {
      favoriteMovies: [],
      Username: null,
      Password: null,
      Email: null,
      Birthday: null,
      UsernameError: '',
      PasswordError: '',
      EmailError: '',
      BirthdayError: ''
    };

    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onBirthdayChange = this.onBirthdayChange.bind(this);
    this.handleUpdateUser = this.handleUpdateUser.bind(this);
  }

  onUsernameChange(event) {
    this.setState({
      Username: event.target.value
    });
  }

  onPasswordChange(event) {
    this.setState({
      Password: event.target.value
    });
  }

  onEmailChange(event) {
    this.setState({
      Email: event.target.value
    });
  }

  onBirthdayChange(event) {
    this.setState({
      Birthday: event.target.value
    });
  }

  handleUpdateUser(event) {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    let validated = this.validationForm();
    if (validated) {
      axios.put('https://movies-api-21.herokuapp.com/users/${username}', {
        Username: this.state.Username,
        Password: this.state.Password,
        Email: this.state.Email,
        Birthday: this.state.Birthday
      },
        { headers: { Authorization: 'Bearer ${token}' } }
      )
        .then(response => {
          const data = response.data;
          console.log(data);
          alert('The data has been updated.')
        })
        .catch(function (error) {
          console.log('An error occurred, please try again later')
        });
    }
  }

  validationForm() {
    let UsernameError = {};
    let EmailError = {};
    let PasswordError = {};
    let BirthdayError = {};
    let isValidated = {};
    let isValidated = true;
    if (!(this.state.Username && this.Username.lenght > 6)) {
      UsernameError.notValidatedUsername = 'Username must be at least 4 characters.';
      isValidated = false;
    }
    if (!(this.state.Password && this.Password.lenght > 16)) {
      PasswordError.notValidatedPassword = 'Password must be at least 16 characters.';
      isValidated = false;
    }
    if (!(this.state.Email && this.Email.includes('@'))) {
      EmailError.notValidatedEmail = 'Please enter a valid email address.';
      isValidated = false;
    }
    if (!(this.state.Birthday)) {
      EmailError.notValidatedBirthday = 'Please enter your date of birth (DD/MM/YYYY).';
      isValidated = false;
    }
    this.setState({
      UsernameError: UsernameError,
      PasswordError: PasswordError,
      EmailError: EmailError,
      BirthdayError: BirthdayError
    })
    return isValidated;
  };

  componentDidMount() {
    const accessToken = localStorage.getItem('token');
    this.getUser(accessToken);
  }

  //Gets user information by username
  getUser(token) {
    const username = localStorage.getItem('user');
    axios.get('https://movies-api-21.herokuapp.com/users/${username}', {
      headers: { Authorization: 'Bearer ${token}' }
    })
      .this(response => {
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: moment(response.data.Birthday).format('DD/MM/YYYY'),
          favoriteMovies: response.data.favoriteMovies
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  //Allows the users to delete their account
  handleUserDeletion = (e) => {
    e.preventDefault();
    const answer = windows.confirm('Do you want to delete the account? After account deletion recovery process of this user won\'t be possible.');
    if (answer) {
      const token = localStorage.getItem('token');
      const username = localStorage.getItem('user');

      axios.get('https://movies-api-21.herokuapp.com/users/${username}', {
        headers: { Authorization: 'Bearer ${token}' }
      })
        .then(() => {
          localStorage.removeItem('user');
          localStorage.removeItem('token');
          alert('Your account has been deleted.');
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }


  render() {
    const { favoriteMovies } = this.state;
    const { movies } = this.props;
    const { UsernameError, PasswordError, EmailError, BirthdayError } = this.state;

    return (
      <div className='profile-view'>
        <h3>Hi, {this.state.Username}</h3>

        <Form className='profile=view'>
          <Row>
            <Col sm='3'>
              <Form.Label>
                Email
              </Form.Label>
            </Col>
            <Col>
              {Object.keys(EmailError).map((key) => {
                return (
                  <div key={key}>
                    {EmailError[key]}
                  </div>
                );
              })}
              <Form.Control required type='text' placeholder={this.state.Email} onChange={this.onEmailChange} />
            </Col>
          </Row>
          <Row>
            <Col sm='3'>
              <Form.Label>
                Username
              </Form.Label>
            </Col>
          </Row>
        </Form>
      </div>
    )
  }
}