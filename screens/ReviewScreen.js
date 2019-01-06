import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Icon } from 'react-native-elements';

class ReviewScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'Review Jobs',
    headerRight: (
      <Icon
        name="settings"
        onPress={() => navigation.navigate('settings')}
        color="rgba(0, 122, 255, 1)"
      />
    ),
  })

  render() {
    return (
      <View><Text>Review Screen</Text></View>
    );
  }
}

export default ReviewScreen;
