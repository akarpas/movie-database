import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPopularMovies } from '../../actions/movieDatabase';

import style from './index.module.scss';

class MovieList extends Component {
  state = {
    isSearch: false,
  }

  componentDidMount = () => {
    this.props.getPopularMovies();
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
    const { moviesLoading, moviesList } = this.props;

    return (
      <div className={style.container}>
        {moviesLoading || !moviesList
          ? <div>Loading...</div>
          : <div className={style.movies}>
              {
                moviesList.map(movie => {
                  const { title, poster_path } = movie;
                  const imageBaseUrl = 'https://image.tmdb.org/t/p/w500'
                  return (
                    <div className={style.movieThumb}>
                      <img
                        className={style.poster}
                        src={`${imageBaseUrl}${poster_path}`}
                        alt={title}
                      />
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
  moviesLoading: state.movieDatabase.moviesLoading,
  moviesList: state.movieDatabase.moviesList,
})

const mapDispatchToProps = dispatch => ({
  getPopularMovies: () => dispatch(getPopularMovies())
})

export default connect(mapStateToProps, mapDispatchToProps)(MovieList);