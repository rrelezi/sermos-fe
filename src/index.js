import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import RouterIndex from "./routes";
import {Toaster} from "react-hot-toast";
import {Provider} from "react-redux";

import {persistor, store} from '../src/store/index'
import {PersistGate} from "redux-persist/integration/react";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Provider store={store}>
        <PersistGate persistor={persistor}>
            <React.StrictMode>
                <Toaster/>
                <RouterIndex />
            </React.StrictMode>
        </PersistGate>
    </Provider>

);

reportWebVitals();
