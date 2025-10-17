import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import { combineReducers } from 'redux';

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart'], // only persist the cart slice
};

const rootReducer = {
  cart: cartReducer,
};
// Because our store uses configureStore with an object of slice reducers, we'll create a combined reducer function
const combinedReducer = combineReducers(rootReducer);
const persistedCombinedReducer = persistReducer(persistConfig, combinedReducer);

export const store = configureStore({
  reducer: persistedCombinedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export default store;
