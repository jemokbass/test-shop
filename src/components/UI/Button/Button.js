import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';

const Button = ({ children, clicked, type, btnType, uppercase, disabled }) => {
  return (
    <button
      className={['button', btnType, uppercase && 'uppercase'].join(' ')}
      onClick={clicked}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

Button.default = {
  type: 'button',
  children: '',
  btnType: '',
  uppercase: '',
};

Button.propTypes = {
  type: PropTypes.oneOf(['submit', 'button', 'reset']),
  children: PropTypes.node,
  btnType: PropTypes.oneOf(['success', 'danger']),
  uppercase: PropTypes.bool,
};

export default Button;
