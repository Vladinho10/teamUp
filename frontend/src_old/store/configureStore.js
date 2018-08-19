import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import EventReducer from '../reducers/EventReducer';
import UserReducer from '../reducers/UserReducer';
import SearchReducer from '../reducers/SearchReducer';
import ParticipantReducer from '../reducers/ParticipantReducer';

export default () => {
  const store = createStore(combineReducers({
    events: EventReducer,
    participants: ParticipantReducer,
    userData: UserReducer,
    searchData: SearchReducer
  }), composeWithDevTools(applyMiddleware(thunk)));
  return store;
};
