import React from 'react';
import {
  View, Text, Dimensions, Platform,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { MapView } from 'expo';
import { Card } from 'react-native-elements';
import striptags from 'striptags';
import Swipe from '../components/Swipe';
import latlngData from '../lat_lng_data';

const SCREEN_HEIGHT = Dimensions.get('window').height;

const styles = {
  mb10: {
    marginBottom: 10,
  },
  textBold: {
    fontWeight: 'bold',
  },
};

const { mb10, textBold } = styles;

const DeckScreen = ({ listing }) => {
  const getLatLng = () => {
    const i = Math.floor(Math.random() * 9) + 1;
    const deltas = { latitudeDelta: 0.045, longitudeDelta: 0.02 };
    const region = { ...latlngData[i], ...deltas };
    return region;
  };

  const renderText = (header, text = 'NA') => (
    <Text style={mb10}>
      <Text style={textBold}>{header}</Text>
      &nbsp;
      <Text>{text}</Text>
    </Text>
  );

  const renderCard = job => (
    <Card title={job.title}>
      <View style={[{ height: SCREEN_HEIGHT * 0.3 }, mb10]}>
        <MapView
          scrollEnabled={false}
          style={{ flex: 1 }}
          cacheEnabled={Platform.OS === 'android'}
          initialRegion={getLatLng()}
        />
      </View>
      {renderText('Company Name:', job.company.name)}
      {renderText('Job Post Time:', job.post_date)}
      {renderText('Description:', striptags(job.description).slice(0, 200))}
    </Card>
  );

  const renderNoMoreCards = () => (
    <Card title="No more jobs!" />
  );

  return (
    <View style={{ marginTop: 10 }}>
      <Swipe
        data={listing}
        renderCard={renderCard}
        renderNoMoreCards={renderNoMoreCards}
      />
    </View>
  );
};

DeckScreen.propTypes = {
  listing: PropTypes.instanceOf(Array).isRequired,
};

const mapStateToProps = ({ job: { listing } }) => ({ listing });

export default connect(mapStateToProps)(DeckScreen);
