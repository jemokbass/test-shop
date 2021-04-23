import React from 'react';

import './Backdrop.css';

const Backdrop = props => {
  const { show, clicked } = props;

  return show ? <div className="backdrop" onClick={clicked}></div> : null;
};

export default Backdrop;
