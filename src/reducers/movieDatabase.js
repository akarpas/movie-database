const initialState = {
  moviesLoading: false,
  popularMoviesList: [],
  searchMoviesList: [],
  savedSearchTerm: '',
}

const setPopularMovies = (state, action) => {
  return { ...state, popularMoviesList: action.payload, moviesLoading: false };
}

const setSearchMovies = (state, action) => {
  const { payload } = action;
  const { results, query } = payload;
  return {
    ...state,
    searchMoviesList: results,
    savedSearchTerm: query,
    moviesLoading: false
  };
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
    case 'SET_SEARCH_MOVIES':
      return setSearchMovies(state, action);
    default:
      return state;
  }
}

export const getMoviesLoading = (state) => state.movieDatabase.moviesLoading;
export const getPopularMoviesList = (state) => state.movieDatabase.popularMoviesList;
export const getSearchMoviesList = (state) => state.movieDatabase.searchMoviesList;
export const getSearchTerm = (state) => state.movieDatabase.savedSearchTerm;