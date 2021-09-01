//imports SCSS styles
import './director-view.scss';

import React from 'react';
import PropTypes from 'prop-types';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

export class DirectorView extends React.Component {
  render() {
    const { director, onBackClick } = this.props;

    return (
      <Row className='director-view'>
        <Col className='d-flex' md={12}>
          <div className='director-name'>
            <h2>
              <span className='value'>{director.Name}</span>
            </h2>
          </div>
          <div className='director-bio'>
            <span className='value'>{director.Bio}</span>
          </div>
          <div className='director-birthdate'>
            <span className='value'>{director.Birth}</span>
          </div>
          <div className='button-space' />
          <Button variant='primary' onClick={() => { onBackClick(null); }}>Back</Button>
        </Col>
      </Row >
    );
  }
}

DirectorView.propTypes = {
  director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired,
    Birth: PropTypes.string.isRequired,
    Death: PropTypes.string.isRequired
  })
};

export default DirectorView;