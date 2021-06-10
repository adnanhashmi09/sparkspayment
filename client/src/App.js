import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Paypal from './Paypal';
import Home from './Home';
import Success from './Success';
import Failed from './Failed';
import './bg.jpg';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/checkout">
            <Paypal />
          </Route>
          <Route exact path="/success">
            <Success />
          </Route>
          <Route exact path="/failed">
            <Failed />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
