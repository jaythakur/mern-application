import React from 'react';
import PropTypes from 'prop-types';

import './Avatar.css';

const Avatar = (props) => (
  <div className={`avatar ${props.className}`}>
    <img
      src={props.src}
      alt={props.alt}
      style={{ width: props.width, height: props.height }}
    />
  </div>
);

Avatar.defaultProps = {
  className: '',
  width: '',
  height: '',
  alt: '',
};

Avatar.propTypes = {
  className: PropTypes.string,
  src: PropTypes.string.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
  alt: PropTypes.string,
};

export default Avatar;
