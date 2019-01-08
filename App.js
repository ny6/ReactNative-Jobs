import React from 'react';
import { Provider } from 'react-redux';
import store from './src/store';
import RootContainer from './src/routes';

const App = () => (
  <Provider store={store}>
    <RootContainer />
  </Provider>
);

export default App;
