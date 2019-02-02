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
    page: 1,
  }

  componentDidMount = () => {
    const { getPopularMovies } = this.props;
    getPopularMovies(1);
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

  handleClick = (e, direction) => {
    const { page } = this.state;
    const { getPopularMovies } = this.props;
    const previous = direction === 'previous'
    getPopularMovies(previous ? page - 1 : page + 1);
    if (previous) {
      this.setState({ page: page - 1 })
    } else {
      this.setState({ page: page + 1 })
    }
  }

  render() {
    const { moviesLoading, popularMoviesList, searchMoviesList } = this.props;
    const { isSearch, page } = this.state;
    const lastPage = page === 5;
    const firstPage = page === 1;
    const movies = isSearch ? searchMoviesList : popularMoviesList;

    return (
      <div className={style.container}>
        {isSearch ? <h3>Results:</h3> : <h3>Popular Movies</h3>}
        {!isSearch && <div className={style.controls}>
          <div className={style.control} onClick={e => this.handleClick(e, 'previous')}>
            {!firstPage && 'Previous'}
          </div>
          <div className={style.control} onClick={e => this.handleClick(e, 'next')}>
            {!lastPage && 'Next'}
          </div>
        </div>}
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
  getPopularMovies: (page) => dispatch(getPopularMovies(page)),
  searchMovies: (query) => dispatch(searchMovies(query)),
})

export default connect(mapStateToProps, mapDispatchToProps)(MovieList);