import React from 'react';

import './Input.css';

const Input = props => {
  const { invalid, shouldValidate, touched, elementType, elementConfig, value, changed, label } = props;
  let inputElement = null;
  const inputClasses = ['input__element'];

  if (invalid && shouldValidate && touched) {
    inputClasses.push('invalid');
  }

  switch (elementType) {
    case 'input':
      inputElement = (
        <input className={inputClasses.join(' ')} {...elementConfig} value={value} onChange={changed} />
      );
      break;
    case 'textarea':
      inputElement = (
        <textarea className={inputClasses.join(' ')} {...elementConfig} value={value} onChange={changed} />
      );
      break;
    case 'select':
      inputElement = (
        <select className={inputClasses.join(' ')} value={value} onChange={changed}>
          {elementConfig.options.map(item => {
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
        <input className={inputClasses.join(' ')} {...elementConfig} value={value} onChange={changed} />
      );
  }

  let validationError = null;

  if (invalid && touched) validationError = <span>Please, enter a valid value</span>;

  return (
    <div className="input">
      <label className="input__label">{label}</label>
      {inputElement}
      {validationError}
    </div>
  );
};

export default Input;
