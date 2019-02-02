const API_KEY = '6e13b454073848d7b6853f415e2636be';

export const getPopularMovies = () => dispatch  => {
  dispatch({
    type: 'LOADING_MOVIES',
    payload: 'result'
  })
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1  `
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