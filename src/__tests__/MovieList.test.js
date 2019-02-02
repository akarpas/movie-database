import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import createStore from '../store';
import MovieList from '../components/MovieList/'
import MainPage from '../components/MainPage/'
import { mount } from 'enzyme';

const store = createStore({});
const searchTerm = "pulp";
const initialState = {
  movieDatabase: {
    moviesLoading: false,
    popularMoviesList: [],
    searchMoviesList: [],
    savedSearchTerm: '',
  }
}
let wrapper;

describe('basic rendered items', () => {
  beforeAll(() => {
    wrapper = mount(
      <Provider store={store} initialState={initialState}>
        <MovieList searchTerm={""}/>
      </Provider>
    )
  })
  afterAll(() => {
    wrapper.unmount();
  })
  it('renders without crashing', () => {
    expect(wrapper).toBeTruthy();
  });
  it('contains a Popular Movies title', () => {
    expect(wrapper.find('h3').text()).toContain('Popular Movies');
  })
  it('contains a Loading div', () => {
    expect(wrapper.find('h4').text()).toContain('Loading');
  })
})

describe('loading popular movies', () => {
  beforeAll(async (done) => {
    wrapper = mount(
      <Provider store={store} initialState={initialState}>
        <BrowserRouter>
          <MovieList searchTerm={""}/>
        </BrowserRouter>
      </Provider>
    )
    setTimeout(() => {
      wrapper.update()
      done()
    }, 1500);
  });
  afterAll(() => {
    wrapper.unmount();
  });
  it('contains a container for the movies', () => {
    expect(wrapper.find('.movies').length).toEqual(1);
  });
  it('contains 20 movies', () => {
    expect(wrapper.find('.movieThumb').length).toEqual(20);
  });
  it('contains 20 images', () => {
    expect(wrapper.find('img').length).toEqual(20);
  });
})

describe('loads movies on change of input', () => {
  beforeAll(async (done) => {
    wrapper = mount(
      <Provider store={store} initialState={initialState}>
        <BrowserRouter>
          <MainPage />
        </BrowserRouter>
      </Provider>
    )
    const input = wrapper.find('input')
    input.simulate('change', { target: { value: searchTerm }})
    setTimeout(() => {
      wrapper.update();
      done()
    }, 2500);
  });
  afterAll(() => {
    wrapper.unmount();
  });
  it('contains a container for the movies', () => {
    expect(wrapper.find('.movies').length).toEqual(1);
  });
  it('contains more than 0 results', () => {
    expect(wrapper.find('.movieThumb').length).toBeGreaterThan(0);
  });
  it('contains 20 images', () => {
    expect(wrapper.find('img').first().prop('alt').toLowerCase()).toContain(searchTerm);
  });
})