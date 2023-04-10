import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import './styles/index.css';
import './styles/appIndex.css';
import 'remixicon/fonts/remixicon.css';
import RouterIndex from "./routes";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <RouterIndex />
  </React.StrictMode>
);

reportWebVitals();
