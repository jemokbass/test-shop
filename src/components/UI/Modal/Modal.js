import React, { Component } from 'react';
import Aux from '@Src/hoc/Aux';
import Backdrop from '../Backdrop/Backdrop';
import './Modal.css';

class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.show !== this.props.show ||
      nextProps.children !== this.props.children
    );
  }

  render() {
    const { children, show, closeModal } = this.props;
    return (
      <Aux>
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
      </Aux>
    );
  }
}

export default Modal;
