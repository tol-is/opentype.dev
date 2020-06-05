import { render } from 'react-dom';
import React, { useCallback, useEffect } from 'react';
import { Provider } from 'react-redux';

import AppHeader from './app-header';
import AppMain from './app-main';
import { PersistGate } from 'redux-persist/integration/react';

import configureStore from './configure-store';

import AppContext from './app-context';
import useLocalStorage from './use-local-storage';

import './app.css';

const { store, persistor } = configureStore();

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppHeader />
        <AppMain />
      </PersistGate>
    </Provider>
  );
};

render(<App />, document.getElementById('__root'));
