// import PouchDB from 'pouchdb';
import { createStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import idbStorage from 'redux-persist-indexeddb-storage';

import { library } from './modules/library';
// import { fonts } from './modules/fonts';
import { tester } from './modules/tester';

const storage = idbStorage('opentype-tester');

const persistConfig = {
  key: 'root.0.1.1',
  storage,
};

const rootReducer = combineReducers({
  library,
  tester,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
  let store = createStore(
    persistedReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  let persistor = persistStore(store);
  return { store, persistor };
};
