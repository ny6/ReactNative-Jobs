import React from 'react';
import {
  createBottomTabNavigator, createStackNavigator, createAppContainer,
} from 'react-navigation';
import {
  AuthScreen, DeckScreen, MapScreen, ReviewScreen, WelcomeScreen, SettingsScreen,
} from './src/screens';

const MainNavigator = createBottomTabNavigator({
  welcome: WelcomeScreen,
  auth: AuthScreen,
  main: {
    screen: createBottomTabNavigator({
      map: MapScreen,
      deck: DeckScreen,
      review: {
        screen: createStackNavigator({
          review: ReviewScreen,
          settings: SettingsScreen,
        }),
      },
    }),
  },
});

const RootContainer = createAppContainer(MainNavigator);

const App = () => <RootContainer />;

export default App;
