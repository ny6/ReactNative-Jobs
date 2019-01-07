import React from 'react';
import {
  ScrollView, View, Text, Dimensions,
} from 'react-native';
import { Button } from 'react-native-elements';
import PropTypes from 'prop-types';

const SCREEN_WIDTH = Dimensions.get('window').width;

const styles = {
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH,
  },
  slideText: {
    fontSize: 30,
    color: '#fff',
  },
  buttonStyle: {
    backgroundColor: '#028801',
    marginTop: 15,
  },
};

const Slides = ({ data, onComplete }) => (
  <ScrollView
    horizontal
    pagingEnabled
    style={{ flex: 1 }}
  >
    {data.map(({ text, backgroundColor }, index) => (
      <View
        key={text}
        style={[styles.slide, { backgroundColor }]}
      >
        <Text style={styles.slideText}>{text}</Text>
        {index === data.length - 1 && (
          <Button
            title="Onwards!"
            raised
            buttonStyle={styles.buttonStyle}
            onPress={onComplete}
          />
        )}
      </View>
    ))}
  </ScrollView>
);

Slides.propTypes = {
  data: PropTypes.instanceOf(Array).isRequired,
  onComplete: PropTypes.func.isRequired,
};

export default Slides;
