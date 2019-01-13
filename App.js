import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Notifications } from 'expo';
import { Alert } from 'react-native';
import configureStore from './src/store';
import RootContainer from './src/routes';
import registerForNotifications from './src/services/push_notifications';

const { persistor, store } = configureStore();

class App extends Component {
  async componentDidMount() {
    const token = await registerForNotifications();
    Notifications.addListener((notification) => {
      const { data: { text }, origin } = notification;

      if (origin === 'received' && text) {
        Alert.alert(
          'New Notification',
          text,
          [{ text: 'Ok' }],
        );
      }
    });
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <RootContainer />
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
