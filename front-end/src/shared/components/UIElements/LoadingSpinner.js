import React from 'react';
import PropTypes from 'prop-types';

import './LoadingSpinner.css';

const LoadingSpinner = (props) => (
  <div className={`${props.asOverlay && 'loading-spinner__overlay'}`}>
    <div className="lds-dual-ring" />
  </div>
);

LoadingSpinner.defaultProps = {
  asOverlay: false,
};

LoadingSpinner.propTypes = {
  asOverlay: PropTypes.bool,
};

export default LoadingSpinner;
