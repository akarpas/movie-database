import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import style from './index.module.scss';

const API_KEY = '6e13b454073848d7b6853f415e2636be';

class MoviePage extends Component {
  state = {
    loading: true,
    movie: null,
  }

  componentDidMount = async () => {
    const { location } = this.props;
    const { pathname } = location;
    const id = pathname.split('/')[1];
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US    `
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ movie: data, loading: false })
  }

  render() {
    const { movie, loading } = this.state;

    if (loading) {
      return (
        <div className={style.container}>
          <div className={style.loading}>Loading...</div>
        </div>
      )
    } else {
      const imageBaseUrl = 'https://image.tmdb.org/t/p/w500'
      const { poster_path, genres, title, overview, release_date, tagline } = movie;

      return (
        <div className={style.container}>
          <img className={style.poster} src={`${imageBaseUrl}${poster_path}`} alt={title} />
          <div className={style.details}>
            <h1>{title}</h1>
            <strong>Genres:</strong> {genres.map((genre, index) => {
              const comma = index < genres.length - 1;
              return <span key={genre.id}>{genre.name}{comma && ', '}</span>
            })}
            <h4>{tagline}</h4>
            <p>{overview}</p>
            <strong>Release Date: </strong>{release_date}
            <br /><br />
            <Link className={style.link} to='/'>
              Go Back
            </Link>
          </div>
        </div>
      )
    }
  }
}

export default MoviePage;