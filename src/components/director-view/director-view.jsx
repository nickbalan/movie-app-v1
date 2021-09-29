//imports SCSS styles
import './director-view.scss';

import React from 'react';
//import PropTypes from 'prop-types';

import Button from 'react-bootstrap/Button';


export class DirectorView extends React.Component {
  render() {
    const { director, onBackClick } = this.props;

    return (
      <div className='director-view'>
          <div className='director-name'>
            <h1>
              <span className='value'>{director.Name}</span>
            </h1>
          </div>
          <div className='director-bio'>
            <span className='value'>{director.Bio}</span>
          </div>
          <div className='director-birthdate'>
            <span className='value'>{director.Birth}</span>
          </div>
          <div className='button-space' />
          <Button variant='primary' onClick={() => { onBackClick(null); }}>Back</Button>
      </div >
    );
  }
}