import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import configureStore from './src/store';
import RootContainer from './src/routes';

const { persistor, store } = configureStore();

const App = () => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <RootContainer />
    </PersistGate>
  </Provider>
);

export default App;
