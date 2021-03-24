import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';

const Button = ({
  children,
  clicked,
  type,
  btnType,
  uppercase,
  disabled,
  className,
}) => {
  return (
    <button
      className={['button', btnType, className, uppercase && 'uppercase'].join(
        ' '
      )}
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
  className: '',
};

Button.propTypes = {
  type: PropTypes.oneOf(['submit', 'button', 'reset']),
  children: PropTypes.node,
  btnType: PropTypes.oneOf(['success', 'danger']),
  uppercase: PropTypes.bool,
  className: PropTypes.string,
};

export default Button;
