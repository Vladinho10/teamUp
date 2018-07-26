import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import EventReducer from '../reducers/EventReducer';
import UserReducer from '../reducers/UserReducer';
import ParticipantReducer from '../reducers/ParticipantReducer';

export default () => {
  const store = createStore(combineReducers({
    events: EventReducer, // {}
    userData: UserReducer // {}
  }), composeWithDevTools(applyMiddleware(thunk)));
  return store;
};
