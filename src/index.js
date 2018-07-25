import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import buttonReducer from './store/reducers/button';
import cardReducer from './store/reducers/card';
import popupReducer from './store/reducers/popUp';
import cardReserveReducer from './store/reducers/cardReserve';

const rootReducer = combineReducers({
  button: buttonReducer,
  card: cardReducer,
  popup: popupReducer,
  cardReserve: cardReserveReducer
});

const logger = store => {
  return next => {
    return action => {
      console.log('Middleware Dispatching', action);
      const result = next(action);
      console.log('Middleware next state', store.getState());
      return result;
    }
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(logger, thunk)));

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
