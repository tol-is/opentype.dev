import { render } from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { css } from 'emotion';

import AppHeader from './app-header';
import AppMain from './app-main';
import { PersistGate } from 'redux-persist/integration/react';

import configureStore from './configure-store';
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
