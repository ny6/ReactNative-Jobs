import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistCombineReducers } from 'redux-persist';
import { AsyncStorage } from 'react-native';
import reducers from '../reducers';

const config = {
  key: 'root.job',
  storage: AsyncStorage,
  whitelist: ['likedJobs'],
};
const reducer = persistCombineReducers(config, reducers);

export default () => {
  const store = createStore(reducer, {}, compose(applyMiddleware(thunk)));
  const persistor = persistStore(store);
  return { persistor, store };
};
