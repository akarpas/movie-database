import React from 'react';
import App from '../components/App';
import { shallow } from 'enzyme';

it('renders without crashing', () => {
  const wrapper = shallow(<App />);
  expect(wrapper).toBeTruthy();
});

it('contains a header with a title', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.find("h1").length).toEqual(1);
  expect(wrapper.find("h1").text()).toContain("The Movie Finder");
})