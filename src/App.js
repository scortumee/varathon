import React, { Component } from 'react'
import Kukulkan from './Kukulkan/Kukulkan.js';
import Yaxchi from './Yaxchi/Yaxchi.js';
import { BrowserRouter, Route } from 'react-router-dom';
import GoogleTagManager from './assets/GoogleTagManager';
import Homepage from './Homepage/Homepage';
import About from './Homepage/Search/ResultsPage';
import './App.css';

import ReactGA from 'react-ga';

//ReactGA.pageview(window.location.pathname + window.location.search);

class App extends Component {
  render() {
    ReactGA.initialize('UA-124784036-1');
    ReactGA.ga('require', 'GTM-55W86GH');

    return (
      <BrowserRouter>
        <div className='App'>
          <GoogleTagManager gtmId='GTM-M84WTCP'/>

          <Route path="/" exact component={Homepage}/>
          <Route path="/search" component={About} />

          <Route path="/booster-packs" exact component={Kukulkan}/>
          <Route path="/starter-decks" exact component={Kukulkan}/>
          <Route path="/structure-decks" exact component={Kukulkan}/>

          <Route path="/booster-packs/:deckName" component={Yaxchi}/>
          <Route path="/starter-decks/:deckName" component={Yaxchi}/>
          <Route path="/structure-decks/:deckName" component={Yaxchi}/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
