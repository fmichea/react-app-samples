import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const fetchMock = require('fetch-mock')

fetchMock.mock('*', 200)

it('renders without crashing', async () => {
  const wrapper = mount(<App />)

  await wrapper.find('div').props().onClick()
});
