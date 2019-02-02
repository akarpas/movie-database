import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  getMoviesLoading, getPopularMoviesList, getSearchMoviesList, getSearchTerm,
} from '../../reducers/movieDatabase';
import { getPopularMovies, searchMovies } from '../../actions/movieDatabase';
import FilmRollIcon from '../../icons/filmroll.png';

import style from './index.module.scss';

class MovieList extends Component {
  state = {
    isSearch: false,
  }

  componentDidMount = () => {
    const { getPopularMovies } = this.props;
    getPopularMovies();
  }

  componentDidUpdate = (nextProps) => {
    const { searchTerm } = this.props;
    if (nextProps.searchTerm !== searchTerm && searchTerm.length) {
      const { searchMovies } = this.props;
      searchMovies(searchTerm)
    }
  }

  componentWillReceiveProps = (nextProps) => {
    const { searchTerm } = nextProps;
    this.setState((state) => {
      if (searchTerm.length) {
        return { ...state, isSearch: true };
      }
      return { ...state, isSearch: false };
    });
  }

  render() {
    const { moviesLoading, popularMoviesList, searchMoviesList } = this.props;
    const { isSearch } = this.state;
    const movies = isSearch ? searchMoviesList : popularMoviesList;

    return (
      <div className={style.container}>
        {isSearch ? <h3>Results:</h3> : <h3>Popular Movies</h3>}
        {moviesLoading || !movies
          ? (
              <div>
                <img className={style.loading} src={FilmRollIcon} alt="Loading..." />
                <h4>Loading...</h4>
              </div>
            )
          : <div className={style.movies}>
              {
                movies.filter(movie => movie.poster_path).map(movie => {
                  const { id, title, poster_path } = movie;
                  const imageBaseUrl = 'https://image.tmdb.org/t/p/w500'
                  return (
                    <div className={style.movieThumb} key={`${id}-thumb`}>
                      <Link to={`/${id}`}>
                        <img
                          key={id}
                          className={style.poster}
                          src={`${imageBaseUrl}${poster_path}`}
                          alt={title}
                        />
                      </Link>
                    </div>
                  )
                })}
            </div>
          }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  moviesLoading: getMoviesLoading(state),
  popularMoviesList: getPopularMoviesList(state),
  searchMoviesList: getSearchMoviesList(state),
  savedSearchTerm: getSearchTerm(state)
})

const mapDispatchToProps = dispatch => ({
  getPopularMovies: () => dispatch(getPopularMovies()),
  searchMovies: (query) => dispatch(searchMovies(query)),
})

export default connect(mapStateToProps, mapDispatchToProps)(MovieList);