import React from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';

import './SideDrawer.scss';

const SideDrawer = (props) => {
  const content = <aside className="side-drawer">{props.children}</aside>;
  return ReactDom.createPortal(content, document.getElementById('drawer-hook'));
};

SideDrawer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SideDrawer;
