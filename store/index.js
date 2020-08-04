import { createStore, combineReducers } from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';


import player from './player.js';


let reducers = combineReducers({ player });

let store = () => {
  return createStore(reducers, composeWithDevTools());
};

export default store();