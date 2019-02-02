import React from 'react';
import MoviePage from '../components/MoviePage/'
import { shallow } from 'enzyme';

let wrapper;

describe('basic rendered items and not loading', () => {
  beforeAll(async (done) => {
    wrapper = shallow(<MoviePage location={{ pathname: "/5000"}}/>)
    setTimeout(() => {
      wrapper.update();
      done();
    }, 1500)
  })
  afterAll(() => {
    wrapper.unmount();
  })
  it('renders without crashing', () => {
    expect(wrapper).toBeTruthy();
  });
  it('contains an H1 title', () => {
    expect(wrapper.find('h1').length).toEqual(1);
  })
  it('contains an image div', () => {
    expect(wrapper.find('img').length).toEqual(1);
  })
  it('contains a Details div', () => {
    expect(wrapper.find('.details').length).toEqual(1);
  })
  it('contains a matching title and overview to the movie loaded on state', () => {
    const movie = wrapper.state('movie');
    const { title, overview } = movie;
    expect(wrapper.find('.details').text()).toContain(title);
    expect(wrapper.find('.details').text()).toContain(overview);
  })
})
