import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import RouterIndex from "./routes";
import {Toaster} from "react-hot-toast";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
      <Toaster/>
    <RouterIndex />
  </React.StrictMode>
);

reportWebVitals();
