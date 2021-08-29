//imports SCSS styles
import './genre-view.scss';

import React from 'react';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export class GenreView extends React.Component {
  render() {
    const { genre, onBackClick } = this.props;

    return (
      <Row className='genre-view'>
        <Col className='d-flex' md={12}>
          <div>
            <h2>{genre.Name}</h2>
            <p>
              Bio:
              <span>{genre.Description}</span>
            </p>
            <div>
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

GenreView.propTypes = {
  genre: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired
  }).isRequired
}

export default GenreView;