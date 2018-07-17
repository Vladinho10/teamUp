import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import EventReducer from '../reducers/EventReducer';
import thunk from 'redux-thunk';

export default () => {
    const store = createStore(combineReducers({
        EventReducer
      }), composeWithDevTools(applyMiddleware(thunk)));
    return store;
}