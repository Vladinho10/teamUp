import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import EventReducer from '../reducers/EventReducer';

export default () => {
  const store = createStore(combineReducers({
    EventReducer
  }), composeWithDevTools(applyMiddleware(thunk)));
  return store;
};
