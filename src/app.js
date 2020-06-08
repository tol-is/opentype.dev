import { render } from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from 'emotion-theming';

import FontFaceLoader from './containers/font-face-loader';
import TesterMain from './containers/tester-main';
import TesterHeader from './containers/tester-header';

import configureStore from './configure-store';

import './reset.css';
import './app.css';

const { store, persistor } = configureStore();

const App = () => {
  return (
    <ThemeProvider theme={{}}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <FontFaceLoader />
          <TesterHeader />
          <TesterMain />
        </PersistGate>
      </Provider>
    </ThemeProvider>
  );
};

render(<App />, document.getElementById('__root'));
