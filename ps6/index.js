import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import ColorPicker from './ColorPicker';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <h1>SI 379 React Color Picker</h1>
    <ColorPicker />
  </React.StrictMode>
);