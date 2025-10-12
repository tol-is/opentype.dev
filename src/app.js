import { createRoot } from 'react-dom/client';
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import FontFaceLoader from './containers/font-face-loader';
import TesterMain from './containers/tester-main';
import TesterHeader from './containers/tester-header';

import configureStore from './configure-store';

import './reset.css';
import './app.css';

const { store, persistor } = configureStore();

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <FontFaceLoader />
        <TesterHeader />
        <div id="top-bar" />
        <TesterMain />
      </PersistGate>
    </Provider>
  );
};

const container = document.getElementById('__root');
const root = createRoot(container);
root.render(<App />);
