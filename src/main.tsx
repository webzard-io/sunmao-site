import React from 'react';
import ReactDOM from 'react-dom';
import RuntimeApp from './components/RuntimeApp';
import { BrowserRouter } from 'react-router-dom';
import './style.css';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <RuntimeApp />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
