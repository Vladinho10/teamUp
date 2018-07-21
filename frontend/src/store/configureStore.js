import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import EventReducer from '../reducers/EventReducer';
import UserReducer from '../reducers/UserReducer';

export default () => {
  const store = createStore(combineReducers({
    events: EventReducer,
    user: UserReducer
  }), composeWithDevTools(applyMiddleware(thunk)));
  return store;
};
