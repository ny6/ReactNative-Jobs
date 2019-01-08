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
        screen: createStackNavigator({
          review: ReviewScreen,
          settings: SettingsScreen,
        }),
      },
    }),
  },
});

const RootContainer = createAppContainer(MainNavigator);

export default RootContainer;
