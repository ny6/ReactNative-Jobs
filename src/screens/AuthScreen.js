import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fbLogin } from '../actions';

class AuthScreen extends Component {
  async componentDidMount() {
    const { startAuth } = this.props;
    await startAuth();
    this.onAuthComplete();
  }

  componentDidUpdate() {
    this.onAuthComplete();
  }

  onAuthComplete = () => {
    const { token, navigation } = this.props;
    if (token) navigation.navigate('main');
  }

  render() {
    return <View />;
  }
}

AuthScreen.defaultProps = {
  token: null,
};
AuthScreen.propTypes = {
  navigation: PropTypes.shape({}).isRequired,
  startAuth: PropTypes.func.isRequired,
  token: PropTypes.string,
};

const mapStateToProps = ({ auth: { token } }) => ({ token });
const mapDispatchToProps = dispatch => ({
  startAuth: () => dispatch(fbLogin()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen);
