import React, { Component } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import MainPage from './MainPage';

import style from './App.module.scss';

class App extends Component {
  render() {
    return (
      <div className={style.app}>
        <h1>The Movie Finder</h1>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={MainPage} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
