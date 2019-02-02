const API_KEY = '6e13b454073848d7b6853f415e2636be';

export const getPopularMovies = (page) => dispatch  => {
  dispatch({
    type: 'LOADING_MOVIES',
    payload: 'result'
  })
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const { results } = data;
      dispatch({
        type: 'SET_POPULAR_MOVIES',
        payload: results
      })
    })
}

export const searchMovies = (query) => (dispatch) => {
  dispatch({
    type: 'LOADING_MOVIES',
    payload: 'result',
  })
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`
  fetch(url)
  .then(response => response.json())
  .then(data => {
    const { results } = data;
    dispatch({
      type: 'SET_SEARCH_MOVIES',
      payload: { results, query }
    })
  })
}