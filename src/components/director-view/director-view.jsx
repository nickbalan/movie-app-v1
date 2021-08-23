//imports SCSS styles
import './director-view.scss';

import React from 'react';
import PropTypes from 'prop-types';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

export class DirectorView extends React.Component {
  render() {
    const { DirectorView, onBackClick } = this.props;

    return (
      <Row className='director-view'>
        <Col className='d-flex' md={12}>
          <div>
            <h2>{director.Name}</h2>
            <p>
              Bio:
              <span>{director.Bio}</span>
            </p>
            <div className='d-flex align-items-center'>
              <button onClick={() => {
                onBackClick(null);
              }}>
                Back
              </button>
            </div>
          </div>
        </Col>
      </Row>
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