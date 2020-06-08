// import PouchDB from 'pouchdb';
import { createStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import idbStorage from 'redux-persist-indexeddb-storage';

import { fonts } from './modules/fonts';
import { tester } from './modules/tester';

const storage = idbStorage('opentype-tester');

const persistConfig = {
  key: 'root.0.0.10',
  storage,
};

const rootReducer = combineReducers({
  fonts,
  tester,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
  let store = createStore(persistedReducer);
  let persistor = persistStore(store);
  return { store, persistor };
};
