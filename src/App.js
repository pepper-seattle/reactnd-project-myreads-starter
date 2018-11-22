import React from 'react'
import './App.css'

import Main from './components/Main.js';
import {Route} from 'react-router-dom';
import Search from './components/Search.js';

class BooksApp extends React.Component {

  render() {
    return(
      <div className="app">
        <Route exact path="/" component={Main}/>
        <Route exact path="/search" component={Search}/>
      </div>
    )
  }
}

export default BooksApp;
