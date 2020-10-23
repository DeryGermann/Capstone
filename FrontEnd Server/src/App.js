import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomePage from './components/home';
import SignUpPage from './components/signUp';

class App extends Component {

  render() {
    return(
      <Router>
        <Route path='/' exact component={HomePage}/>
        <Route path='/signup' component={SignUpPage}/>
      </Router>
    );
  }
}

export default App;