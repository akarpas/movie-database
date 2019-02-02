const initialState = {
  moviesLoading: false,
  moviesList: [],
}

const setPopularMovies = (state, action) => {
  return { ...state, moviesList: action.payload, moviesLoading: false };
}

const setLoading = (state) => {
  return { ...state, moviesLoading: true };
}

export default (state = {initialState}, action) => {
  switch (action.type) {
    case 'LOADING_MOVIES':
      return setLoading(state);
    case 'SET_POPULAR_MOVIES':
      return setPopularMovies(state, action);
    default:
      return state;
  }
}