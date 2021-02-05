import React from 'react';
import PropTypes from 'prop-types';

import './Card.css';

const Card = (props) => {
  const { className, style } = props;
  return (
    <div className={`card ${className}`} style={style}>
      {props.children}
    </div>
  );
};

Card.defaultProps = {
  className: '',
  style: {},
};

Card.propTypes = {
  className: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.object,
  children: PropTypes.node.isRequired,
};

export default Card;
