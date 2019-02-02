import React, { Component } from 'react';
import style from './index.module.scss';

class MovieList extends Component {
  state = {
    isSearch: false,
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
    const { searchTerm } = this.props;
    const { isSearch } = this.state;

    return (
      <div className={style.container}>
        Movie List
      </div>
    )
  }
}

export default MovieList;