import React, { Component } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fbLogout, clearLikedJobs } from '../actions';
import { mb10 } from './DeckScreen';

class SettingsScreen extends Component {
  static navigationOptions = () => ({
    headerTitle: 'Settings',
  })

  render() {
    const { logout, navigation, clearJobs } = this.props;
    return (
      <View>
        <Button
          buttonStyle={[{ marginTop: 10 }, mb10]}
          title="Reset Liked Jobs"
          onPress={() => clearJobs()}
          icon={{ name: 'delete-forever' }}
          backgroundColor="#F44336"
        />
        <Button
          title="Logout"
          onPress={() => logout(navigation)}
        />
      </View>
    );
  }
}

SettingsScreen.propTypes = {
  logout: PropTypes.func.isRequired,
  navigation: PropTypes.shape({}).isRequired,
  clearJobs: PropTypes.func.isRequired,
};

const mapDisptachToProps = dispatch => ({
  logout: navigation => dispatch(fbLogout(navigation)),
  clearJobs: () => dispatch(clearLikedJobs()),
});

export default connect(null, mapDisptachToProps)(SettingsScreen);
