import { configureStore, combineReducers } from '@reduxjs/toolkit';

import { authSlice } from './auth/authReducer';
import { postSlice } from './post/postReducer';

const rootReducer = combineReducers({
  [authSlice.name]: authSlice.reducer,
  [postSlice.name]: postSlice.reducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware({
      serializableCheck: false,
    }),
});