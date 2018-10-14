import React, { Component } from 'react'
import Kukulkan from './Kukulkan/Kukulkan.js';

import { BrowserRouter, Route } from 'react-router-dom';
import GoogleTagManager from './assets/GoogleTagManager';
import Main from './Main/Main';
import './App.css';

import ReactGA from 'react-ga';

//ReactGA.pageview(window.location.pathname + window.location.search);

class App extends Component {
  state = {

  }

  render() {
    ReactGA.initialize('UA-124784036-1');
    ReactGA.ga('require', 'GTM-55W86GH');



    return (
      <BrowserRouter>
        <div className='App'>
          <GoogleTagManager gtmId='GTM-M84WTCP'/>

          <Route path="/" exact component={Main}/>
          <Route path="/home" exact component={Main}/>
          <Route path="/booster-packs" component={Kukulkan}/>
          <Route path="/starter-decks" component={Kukulkan}/>
          <Route path="/structure-decks" component={Kukulkan}/>

        </div>
      </BrowserRouter>
    );
  }
}

export default App;
