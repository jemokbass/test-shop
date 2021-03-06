import React from 'react';
import './Input.css';

const Input = props => {
  let inputElement = null;

  switch (props.elementType) {
    case 'input':
      inputElement = (
        <input
          className="input__element"
          {...props.elementConfig}
          value={props.value}
        />
      );
      break;
    case 'textarea':
      inputElement = (
        <textarea
          className="input__element"
          {...props.elementConfig}
          value={props.value}
        />
      );
      break;
    case 'select':
      inputElement = (
        <select className="input__element" value={props.value}>
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
          className="input__element"
          {...props.elementConfig}
          value={props.value}
        />
      );
  }

  return (
    <div className="input">
      <label className="input__label">{props.label}</label>
      {inputElement}
    </div>
  );
};

export default Input;
