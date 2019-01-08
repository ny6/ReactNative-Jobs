import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { AppLoading } from 'expo';
import { Slides } from '../components';
import { loggedInStatus } from '../actions';

const SLIDE_DATA = [
  { text: 'Welcome to JobApp', backgroundColor: '#03A9F4' },
  { text: 'Set your location, then swipe away', backgroundColor: '#009688' },
  { text: 'Thank you', backgroundColor: '#03A9F4' },
];

class WelcomeScreen extends Component {
  componentDidMount() {
    const { checkLoggedIn } = this.props;
    checkLoggedIn();
  }

  render() {
    const { navigation, loggedIn } = this.props;
    if (loggedIn === null) return <AppLoading />;
    if (!loggedIn) {
      return (
        <Slides
          data={SLIDE_DATA}
          onComplete={() => navigation.navigate('auth')}
        />
      );
    }
    return navigation.navigate('main');
  }
}

WelcomeScreen.defaultProps = {
  loggedIn: null,
};
WelcomeScreen.propTypes = {
  navigation: PropTypes.shape({}).isRequired,
  loggedIn: PropTypes.bool,
  checkLoggedIn: PropTypes.func.isRequired,
};

const mapStateToProps = ({ auth: { loggedIn } }) => ({ loggedIn });
const mapDispatchToProps = dispatch => ({
  checkLoggedIn: () => dispatch(loggedInStatus()),
});

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeScreen);
