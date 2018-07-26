import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import EventReducer from '../reducers/EventReducer';
import UserReducer from '../reducers/UserReducer';
import SearchReducer from '../reducers/SearchReducer';

export default () => {
  const store = createStore(combineReducers({
    events: EventReducer,
    userData: UserReducer,
    searchData: SearchReducer
  }), composeWithDevTools(applyMiddleware(thunk)));
  return store;
};
