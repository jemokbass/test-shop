import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { BurgerBuilder } from './BurgerBuilder';
import BuildControls from '@src/components/Burger/BuildControls/BuildControls';

configure({ adapter: new Adapter() });

describe('<BurgerBuilder/>', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <BurgerBuilder onInitIngredients={() => {}} onInitPrice={() => {}} />
    );
  });

  it('Should render <BuildControls/> when receiving ingredients', () => {
    wrapper.setProps({ ing: { salad: 0 } });
    expect(wrapper.find(BuildControls)).toHaveLength(0);
  });
});
