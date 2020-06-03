import { render } from 'react-dom';
import React, { useCallback, useEffect } from 'react';
import { css, injectGlobal } from 'emotion';

import AppHeader from './app-header';
import AppMain from './app-main';

import AppContext from './app-context';
import useLocalStorage from './use-local-storage';

import './app.css';

const App = () => {
  const [params, setParams] = useLocalStorage('params', { fonts: [] });

  const addFont = useCallback((font) => {
    const { fonts, ...rest } = params;
    setParams({
      ...rest,
      fonts: [...fonts, font],
    });
  });

  useEffect(() => {
    params.fonts.forEach((f) => {
      injectGlobal`${f.global}`;
    });
  }, [params.fonts]);

  return (
    <AppContext.Provider value={{ ...params, addFont }}>
      <AppHeader />
      <AppMain />
    </AppContext.Provider>
  );
};

render(<App />, document.getElementById('__root'));
