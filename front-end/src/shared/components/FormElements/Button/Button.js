/* eslint-disable react/button-has-type */
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './Button.css';

const Button = (props) => {
  if (props.href) {
    return (
      <a
        className={`button button--${props.size || 'default'} ${
          props.inverse && 'button--inverse'
        } ${props.danger && 'button--danger'}`}
        href={props.href}
      >
        {props.children}
      </a>
    );
  }
  if (props.to) {
    return (
      <Link
        to={props.to}
        exact={props.exact}
        className={`button button--${props.size || 'default'} ${
          props.inverse && 'button--inverse'
        } ${props.danger && 'button--danger'}`}
      >
        {props.children}
      </Link>
    );
  }
  return (
    <button
      className={`button button--${props.size || 'default'} ${
        props.inverse && 'button--inverse'
      } ${props.danger && 'button--danger'}`}
      type={props.type || 'button'}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

Button.defaultProps = {
  inverse: false,
  danger: false,
  to: '',
  size: '',
  disabled: false,
  href: '',
  exact: true,
  onClick: () => {},
  children: '',
  type: 'button',
};

Button.propTypes = {
  children: PropTypes.node,
  inverse: PropTypes.bool,
  danger: PropTypes.bool,
  to: PropTypes.string,
  type: PropTypes.string,
  size: PropTypes.string,
  disabled: PropTypes.bool,
  href: PropTypes.string,
  exact: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Button;
