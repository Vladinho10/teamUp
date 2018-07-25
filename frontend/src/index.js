import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import 'normalize.css/normalize.css';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import 'rc-time-picker/assets/index.css';
import 'react-times/css/classic/default.css';
import './styles/main.scss';

const store = configureStore();
// console.log(store.getState(), 'store subscribe');

const App = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);


ReactDOM.render(App, document.getElementById('root'));
