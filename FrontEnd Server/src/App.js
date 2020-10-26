import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";

import HomePage from './components/home';
import SignUpPage from './components/signUp';
import PublicPage from './components/public';
import AccountPage from './components/account';

class App extends Component {

  render() {
    return(
      <Router>
        <Route path='/' exact component={HomePage}/>
        <Route path='/signup' component={SignUpPage}/>
        <Route path='/public' component={PublicPage}/>
        <Route path='/account' component={AccountPage}/>
      </Router>
    );
  }
}

export default App;