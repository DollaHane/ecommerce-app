'use client';

import { Provider } from 'react-redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { cartSlice } from './store';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { theme } from './theme';

type RootState = ReturnType<typeof store.getState>;

const rootReducer = combineReducers({
  cart: cartSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
});

type ProvidersProps = {
  children: React.ReactNode;
};

export default function Providers({ children }: ProvidersProps) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme as Theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </Provider>
  );
}

