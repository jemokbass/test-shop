import React, { Fragment, memo } from 'react';

import Backdrop from '../Backdrop/Backdrop';
import './Modal.css';

const Modal = props => {
  const { children, show, closeModal } = props;

  return (
    <Fragment>
      <Backdrop show={show} clicked={closeModal} />
      <div
        className="modal"
        style={{
          transform: show ? 'translateY(0)' : 'translateY(-200vh)',
          opacity: show ? '1' : '0',
        }}
      >
        {children}
      </div>
    </Fragment>
  );
};

export default memo(
  Modal,
  (prevProps, nextProps) => nextProps.show === prevProps.show && nextProps.children === prevProps.children
);
