import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
// @ts-ignore
import storage from 'redux-persist/lib/storage'


import UserReducer from "./User";

const persistConfig = {
    key: 'root',
    version: 1,
    storage
};

const reducers = combineReducers({
    profile: UserReducer
});

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: false
    })
});

export const persistor = persistStore(store);
