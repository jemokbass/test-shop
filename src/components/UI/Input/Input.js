import React from 'react';
import './Input.css';

const Input = props => {
  let inputElement = null;
  const inputClasses = ['input__element'];

  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push('invalid');
  }

  switch (props.elementType) {
    case 'input':
      inputElement = (
        <input
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case 'textarea':
      inputElement = (
        <textarea
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case 'select':
      inputElement = (
        <select
          className={inputClasses.join(' ')}
          value={props.value}
          onChange={props.changed}
        >
          {props.elementConfig.options.map(item => {
            return (
              <option value={item.value} key={item.value}>
                {item.displayValue}
              </option>
            );
          })}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
  }

  let validationError = null;

  if (props.invalid && props.touched)
    validationError = <span>Please, enter a valid value</span>;

  return (
    <div className="input">
      <label className="input__label">{props.label}</label>
      {inputElement}
      {validationError}
    </div>
  );
};

export default Input;
