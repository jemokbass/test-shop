import React from 'react';
import './BuildControl.css';

const BuildControl = ({ label, added, removed, disabled }) => {
  return (
    <div className="build-control">
      <div className="build-control__label">{label}</div>
      <button
        type="button"
        className="build-control__less"
        onClick={removed}
        disabled={disabled}
      >
        Less
      </button>
      <button type="button" className="build-control__more" onClick={added}>
        More
      </button>
    </div>
  );
};

export default BuildControl;
