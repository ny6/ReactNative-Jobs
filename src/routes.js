import React from 'react';
import { Icon } from 'react-native-elements';
import {
  createBottomTabNavigator, createStackNavigator, createAppContainer,
} from 'react-navigation';
import {
  AuthScreen, DeckScreen, MapScreen, ReviewScreen, WelcomeScreen, SettingsScreen,
} from './screens';

const MainNavigator = createBottomTabNavigator({
  welcome: {
    screen: WelcomeScreen,
    navigationOptions: { tabBarVisible: false },
  },
  auth: {
    screen: AuthScreen,
    navigationOptions: { tabBarVisible: false },
  },
  main: {
    navigationOptions: { tabBarVisible: false },
    screen: createBottomTabNavigator({
      map: MapScreen,
      deck: DeckScreen,
      review: {
        navigationOptions: {
          title: 'Review Jobs',
          tabBarIcon: ({ tintColor }) => (
            <Icon name="favorite" size={25} color={tintColor} />
          ),
        },
        screen: createStackNavigator({
          review: ReviewScreen,
          settings: SettingsScreen,
        }),
      },
    }, {
      tabBarOptions: {
        labelStyle: { fontSize: 12 },
      },
    }),
  },
});

const RootContainer = createAppContainer(MainNavigator);

export default RootContainer;
