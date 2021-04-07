import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppView from './components/app';

ReactDOM.render(
  <React.StrictMode>
    <AppView />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//the following was removed as recommended by msw: serviceWorker.unregister();
