import React, { Component } from 'react';
import MovieList from './MovieList';

import style from './App.module.scss';

class App extends Component {
  state = {
    inputValue: '',
  }

  handleChange = (e) => {
    e.preventDefault();
    const { value } = e.target;
    this.setState({ inputValue: value });
  }

  render() {
    const { inputValue } = this.state;

    return (
      <div className={style.app}>
        <header className={style.appHeader}>
          <input
            className={style.search}
            onChange={e => this.handleChange(e)}
            value={inputValue}
            type="input"
            id="search"
            placeholder="search"
          />
        </header>
        <MovieList searchTerm={inputValue} />
      </div>
    );
  }
}

export default App;
