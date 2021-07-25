import { extend } from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';

import MainView from './components/main-view/main-view';
import { Container } from 'react-bootstrap';

//Main component
class MyFlixApplication extends React.Component {
  render() {
    return (
      <Container>
        <MainView />
      </Container>
    );
  }
}

// Finds the root of the app
const container = document.getElementsByClassName('app-container')[0];

//Renders the app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);