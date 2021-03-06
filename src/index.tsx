import React from 'react';
import './index.css';
import ReactDOM from 'react-dom';
import { App } from './components/App';
import { WithStore } from './store';

ReactDOM.render(
  <React.StrictMode>
    <WithStore>
      <App />
    </WithStore>
  </React.StrictMode>,
  document.getElementById('root')
);
