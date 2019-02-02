import React, { Component } from 'react';
import style from './App.module.scss';

class App extends Component {
  state = {
    inputValue: '',
  }

  onChange = (e) => {
    e.preventDefault();
    const { value } = e.target;
    this.setState({ inputValue: value });
  }

  render() {
    const { inputValue } = this.state;

    return (
      <div className={style.app}>
        <header className={style.appHeader}>
          <input className={style.search} value={inputValue} type="input" id="search" placeholder="search" />
        </header>
      </div>
    );
  }
}

export default App;
