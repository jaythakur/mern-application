import React from 'react';
import ReactDom from 'react-dom';

import './Backdrop.scss';

const Backdrop = (props) =>
  ReactDom.createPortal(
    <div
      className="backdrop"
      onClick={props.onClick}
      onKeyDown={props.onClick}
      role="button"
      tabIndex="0"
      data-testid="backdrop"
    >
      {' '}
    </div>,
    document.getElementById('backdrop-hook'),
  );

export default Backdrop;
