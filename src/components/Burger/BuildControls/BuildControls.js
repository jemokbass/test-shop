import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import './BuildControls.css';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' },
];

const BuildControls = ({
  addIngredient,
  removeIngredient,
  disabled,
  price,
}) => {
  return (
    <div className="build-controls">
      <p>
        Current price: <strong>{price.toFixed(2)}</strong>
      </p>
      {controls.map(ctrl => (
        <BuildControl
          key={ctrl.label}
          label={ctrl.label}
          added={() => addIngredient(ctrl.type)}
          removed={() => removeIngredient(ctrl.type)}
          disabled={disabled[ctrl.type]}
        />
      ))}
    </div>
  );
};

export default BuildControls;
