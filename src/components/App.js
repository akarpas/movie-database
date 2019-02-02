import React, { Component } from 'react';
import logo from '../logo.svg';
import style from './App.module.scss';

class App extends Component {
  render() {
    return (
      <div className={style.app}>
        <header className={style.appHeader}>
          <input className={style.search} type="input" id="search" placeholder="search" />
        </header>
      </div>
    );
  }
}

export default App;
