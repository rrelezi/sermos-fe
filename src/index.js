import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import RouterIndex from "./routes";
import {Toaster} from "react-hot-toast";
import {Provider} from "react-redux";

import { store } from '../src/store/index'

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Provider store={store}>
        <React.StrictMode>
            <Toaster/>
            <RouterIndex />
        </React.StrictMode>
    </Provider>

);

reportWebVitals();
