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
          <div className='genre-name'>
            <h2>
              <span className='value'>{genre.Name}</span>
            </h2>
          </div>
          <div className='genre-description'>
            <span className='value'>{genre.Description}</span>
          </div>
          <div className='button-space'></div>
          <Button onClick={() => { onBackClick(null); }}>Back</Button>
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