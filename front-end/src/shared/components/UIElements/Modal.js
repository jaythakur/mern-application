import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';

import Backdrop from './Backdrop';
import './Modal.scss';

const ModalOverlay = (props) => {
  const content = (
    <div className={`modal-custom ${props.className}`}>
      <header className={`modal__header ${props.headerClass}`}>
        <h2>{props.header}</h2>
      </header>
      <form
        onSubmit={
          props.onSubmit ? props.onSubmit : (event) => event.preventDefault
        }
      >
        <div className={`modal__content ${props.contentClass}`}>
          {props.children}
        </div>
        <footer className={`modal__footer ${props.footerClass}`}>
          {props.footer}
        </footer>
      </form>
    </div>
  );
  return ReactDOM.createPortal(content, document.getElementById('modal-hook'));
};

const Modal = (props) => (
  <>
    {props.show && <Backdrop onClick={props.onCancel} />}
    <CSSTransition
      in={props.show}
      mountOnEnter
      unmountOnExit
      timeout="200"
      classNames="modal-custom"
    >
      <ModalOverlay {...props} />
    </CSSTransition>
  </>
);

Modal.defaultProps = {
  className: '',
  headerClass: '',
  onSubmit: '',
  contentClass: '',
  footerClass: '',
  footer: '',
};

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  className: PropTypes.string,
  headerClass: PropTypes.string,
  onSubmit: PropTypes.func,
  contentClass: PropTypes.string,
  footerClass: PropTypes.string,
  footer: PropTypes.node,
};

export default Modal;
