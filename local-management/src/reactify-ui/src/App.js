import React, { Component } from 'react';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom'
import logo from './logo.svg';
import './App.css';
import Subscribers from './subscribers/Subscribers';
import SubscriberDetail from './subscribers/SubscriberDetail.js'
class App extends Component {
  render() {
    return (
      <BrowserRouter>
          <Switch>
            <Route exact path='/subscribers' component={Subscribers}/>
              <Route exact path='/subscribers/:slug' component={SubscriberDetail}/>
            <Route component={Subscribers}/>
          </Switch>
      </BrowserRouter>
      );
  }
}

export default App;
