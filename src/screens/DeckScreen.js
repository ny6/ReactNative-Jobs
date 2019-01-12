import React from 'react';
import {
  View, Text, Dimensions, Platform,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { MapView } from 'expo';
import { Card, Button } from 'react-native-elements';
import striptags from 'striptags';
import Swipe from '../components/Swipe';
import latlngData from '../lat_lng_data.json';

const SCREEN_HEIGHT = Dimensions.get('window').height;

const styles = {
  detailWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
};

const DeckScreen = ({ listing }) => {
  const getLatLng = () => {
    const i = Math.floor(Math.random() * 10) + 1;
    const deltas = { latitudeDelta: 0.045, longitudeDelta: 0.02 };
    return { ...latlngData[i], ...deltas };
  };

  const renderCard = job => (
    <Card title={job.title}>
      <View style={{ height: SCREEN_HEIGHT * 0.3 }}>
        <MapView
          scrollEnabled={false}
          style={{ flex: 1 }}
          cacheEnabled={Platform.OS === 'android'}
          initialRegion={getLatLng()}
        />
      </View>
      <View style={styles.detailWrapper}>
        <Text>{job.company.name || 'NA'}</Text>
        <Text>{job.post_date}</Text>
      </View>
      <Text>{striptags(job.description).slice(0, 200)}</Text>
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
