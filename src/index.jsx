import { extend } from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';

//This file need to bundle ./index.scss
import './index.scss';

//Main component
class MyFlixApplication extends React.Component {
  render() {
    return (
      <div className='my-flix'>
        <div>Good morning</div>
      </div>
    );
  }
}

// Finds the root of the app
const container = document.getElementsByClassName('app-container'){ [0];

//Renders the app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);