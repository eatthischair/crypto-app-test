import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './features/themeSlice';
import currencyReducer from './features/currencySlice';
import exchangeRatesReducer from './features/exchangeRatesSlice';
export const store = configureStore({
  reducer: {
    themeReducer,
    currencyReducer,
    exchangeRatesReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
