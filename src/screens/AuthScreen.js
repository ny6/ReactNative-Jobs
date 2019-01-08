import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fbLogin } from '../actions';

class AuthScreen extends Component {
  componentDidMount() {
    const { startAuth } = this.props;
    startAuth();
  }

  render() {
    return (
      <View><Text>Auth Screen</Text></View>
    );
  }
}

AuthScreen.propTypes = {
  startAuth: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  startAuth: () => dispatch(fbLogin()),
});

export default connect(null, mapDispatchToProps)(AuthScreen);
