import React from 'react';
import PropTypes from 'prop-types';
import { Slides } from '../components';

const SLIDE_DATA = [
  { text: 'Welcome to JobApp', backgroundColor: '#03A9F4' },
  { text: 'Set your location, then swipe away', backgroundColor: '#009688' },
  { text: 'Thank you', backgroundColor: '#03A9F4' },
];

const WelcomeScreen = ({ navigation }) => (
  <Slides
    data={SLIDE_DATA}
    onComplete={() => navigation.navigate('auth')}
  />
);

WelcomeScreen.propTypes = {
  navigation: PropTypes.shape({}).isRequired,
};

export default WelcomeScreen;
