import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";

import HomePage from './components/home';
import SignUpPage from './components/signUp';
import PublicPage from './components/public';
import AccountPage from './components/account';
import PuzzlePage from './components/puzzle';
import ProtectedRoute from './components/protected_route';

class App extends Component {

  render() {
    let isLoggedIn = false;
    if (sessionStorage.getItem('user')) {
      isLoggedIn = true;
    }

    return(
      <Router>
        <Route path='/' exact component={HomePage}/>
        <Route path='/signup' component={SignUpPage}/>
        <Route path='/public' component={PublicPage}/>
        <ProtectedRoute path='/account' component={AccountPage} auth={isLoggedIn}/>
        <ProtectedRoute path='/puzzle' component={PuzzlePage} auth={isLoggedIn}/>
      </Router>
    );
  }
}

export default App;