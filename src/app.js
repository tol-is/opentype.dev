import { render } from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import styled from '@emotion/styled';

import configureStore from './configure-store';
import TesterMain from './containers/tester-main';
import ConfigPanel from './containers/global-config-panel';

import './app.css';

const Header = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  z-index: 100;
`;

const Main = styled.main`
  min-height: 100vh;
  padding: 8em 0;
`;

const { store, persistor } = configureStore();

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Header>
          <ConfigPanel />
        </Header>
        <Main>
          <TesterMain />
        </Main>
      </PersistGate>
    </Provider>
  );
};

render(<App />, document.getElementById('__root'));
