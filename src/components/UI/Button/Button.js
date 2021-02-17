import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';

const Button = ({ children, clicked, type, btnType, uppercase }) => {
  return (
    <button
      className={['button', btnType, uppercase && 'uppercase'].join(' ')}
      onClick={clicked}
      type={type}
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
