// import PouchDB from 'pouchdb';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import idbStorage from 'redux-persist-indexeddb-storage';

import { library } from './modules/library';
// import { fonts } from './modules/fonts';
import { tester } from './modules/tester';
import { adhesion } from './modules/adhesion';

const storage = idbStorage('opentype-tester');

// const loggerMiddleware = createLogger();

const persistConfig = {
  key: 'root.0.1.1',
  storage,
};

const rootReducer = combineReducers({
  adhesion,
  library,
  tester,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
  let store = createStore(
    persistedReducer
    // applyMiddleware(thunkMiddleware, loggerMiddleware)
  );

  let persistor = persistStore(store);
  return { store, persistor };
};
