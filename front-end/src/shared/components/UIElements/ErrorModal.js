import React from 'react';
import PropTypes from 'prop-types';

import Modal from './Modal';
import Button from '../FormElements/Button/Button';

const ErrorModal = (props) => (
  <Modal
    onCancel={props.onClear}
    header="An Error Occurred!"
    show={!!props.error}
    footer={<Button onClick={props.onClear}>Okay</Button>}
  >
    <p>{props.error}</p>
  </Modal>
);

ErrorModal.defaultProps = {
  error: false,
};

ErrorModal.propTypes = {
  onClear: PropTypes.func.isRequired,
  error: PropTypes.bool,
};

export default ErrorModal;
