import PouchDB from 'pouchdb';
import { createStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import PouchDBStorage from 'redux-persist-pouchdb';

const pouchdb = new PouchDB('opentype-tester');
const storage = new PouchDBStorage(pouchdb);

import { fonts, config } from './modules/fonts';

const persistConfig = {
  key: 'root.0.0.10',
  storage,
};

const rootReducer = combineReducers({
  fonts,
  config,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
  let store = createStore(persistedReducer);
  let persistor = persistStore(store);
  return { store, persistor };
};
