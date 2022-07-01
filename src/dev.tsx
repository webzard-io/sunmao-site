import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import EditorRouter from './components/EditorRouter';
import './style.css';

ReactDOM.render(
  <HashRouter>
    <EditorRouter />
  </HashRouter>,
  document.getElementById('root')
);
