import React from 'react';
import ReactDOM from 'react-dom/client';
import './src/index.css';
import { HashRouter, BrowserRouter } from 'react-router-dom';
import App from './src/App';
import { OtherApp } from './src/otherApp.tsx';
import "bootstrap/dist/css/bootstrap.min.css";
import reportWebVitals from './src/reportWebVitals';
import { BrowserRouter as Router } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <OtherApp />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();