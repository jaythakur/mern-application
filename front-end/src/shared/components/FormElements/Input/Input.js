import React, { useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';

import { validate } from '../../../utils/validators';
import './Input.scss';

const inputReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };
    case 'TOUCH':
      return {
        ...state,
        isTouched: true,
      };
    default:
      return state;
  }
};

const Input = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue || '',
    isValid: props.initialValid || false,
    isTouched: false,
  });

  const changeHandler = (event) => {
    dispatch({
      type: 'CHANGE',
      val: event.target.value,
      validators: props.validators,
    });
  };

  const touchHandler = () => {
    dispatch({
      type: 'TOUCH',
    });
  };

  const { id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  const element =
    props.element === 'input' ? (
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onBlur={touchHandler}
        onChange={changeHandler}
        value={inputState.value}
        autoComplete="off"
      />
    ) : (
      <textarea
        id={props.id}
        rows={props.rows}
        onBlur={touchHandler}
        onChange={changeHandler}
        value={inputState.value}
        autoComplete="on"
      />
    );

  return (
    <div
      className={`form-control ${
        !inputState.isValid && inputState.isTouched && 'form-control--invalid'
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      {element}
      {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
    </div>
  );
};

Input.defaultProps = {
  placeholder: '',
  label: '',
  element: 'input',
  type: 'input',
  rows: '3',
  errorText: '',
  validators: [],
  initialValue: '',
  initialValid: false,
};

Input.propTypes = {
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  element: PropTypes.string,
  type: PropTypes.string,
  rows: PropTypes.string,
  errorText: PropTypes.string,
  validators: PropTypes.array,
  onInput: PropTypes.func.isRequired,
  initialValue: PropTypes.string,
  initialValid: PropTypes.bool,
};

export default Input;
