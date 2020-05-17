import React from 'react';
import { shallow } from 'enzyme';

import App from '../src/App';

test('renders the component', () => {
  const component = shallow(<App />);  
  
  expect(component).toMatchSnapshot();
});