import React, { Component } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fbLogout } from '../actions';

class SettingsScreen extends Component {
  static navigationOptions = () => ({
    headerTitle: 'Settings',
  })

  render() {
    const { logout, navigation } = this.props;
    return (
      <View>
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
};

const mapDisptachToProps = dispatch => ({
  logout: navigation => dispatch(fbLogout(navigation)),
});

export default connect(null, mapDisptachToProps)(SettingsScreen);
