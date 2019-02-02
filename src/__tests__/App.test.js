import React from 'react';
import App from '../components/App';
import MovieList from '../components/MovieList';
import { shallow } from 'enzyme';

it('renders without crashing', () => {
  const wrapper = shallow(<App />);
  expect(wrapper).toBeTruthy();
});

it('contains a input field for search', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.find("input").length).toEqual(1);
  expect(wrapper.find("#search").length).toEqual(1);
})

it('contains a movie list component', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.find(MovieList).length).toEqual(1);
})
