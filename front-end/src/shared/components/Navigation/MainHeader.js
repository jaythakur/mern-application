import React from 'react';
import PropTypes from 'prop-types';

import './MainHeader.scss';

const MainHeader = ({ children }) => (
  <header className="main-header">{children}</header>
);

MainHeader.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainHeader;
