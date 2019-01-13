import React, { Component } from 'react';
import {
  View, Text, Dimensions, Platform,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { MapView } from 'expo';
import { Card, Button, Icon } from 'react-native-elements';
import striptags from 'striptags';
import Swipe from '../components/Swipe';
import latlngData from '../lat_lng_data';
import { likeJob, clearListedJobs } from '../actions';

const SCREEN_HEIGHT = Dimensions.get('window').height;

const styles = {
  mb10: {
    marginBottom: 10,
  },
  textBold: {
    fontWeight: 'bold',
  },
};

export const { mb10, textBold } = styles;
export const getLatLng = () => {
  const i = Math.floor(Math.random() * 9) + 1;
  const deltas = { latitudeDelta: 0.045, longitudeDelta: 0.02 };
  const region = { ...latlngData[i], ...deltas };
  return region;
};

class DeckScreen extends Component {
  static navigationOptions = {
    title: 'Jobs',
    tabBarIcon: ({ tintColor }) => (
      <Icon name="description" size={25} color={tintColor} />
    ),
  }

  renderText = (header, text = 'NA') => (
    <Text style={mb10}>
      <Text style={textBold}>{header}</Text>
      &nbsp;
      <Text>{text}</Text>
    </Text>
  );

  renderCard = job => (
    <Card title={job.title}>
      <View style={[{ height: SCREEN_HEIGHT * 0.3 }, mb10]}>
        <MapView
          scrollEnabled={false}
          style={{ flex: 1 }}
          cacheEnabled={Platform.OS === 'android'}
          initialRegion={getLatLng()}
        />
      </View>
      {this.renderText('Company Name:', job.company.name)}
      {this.renderText('Job Post Time:', job.post_date)}
      {this.renderText('Description:', striptags(job.description).slice(0, 200))}
    </Card>
  );

  renderNoMoreCards = () => {
    const { clearJobs, navigation } = this.props;
    clearJobs();
    return (
      <Card title="No more jobs here!">
        <Button
          title="Back To Map"
          icon={{ name: 'my-location' }}
          backgroundColor="#03A9F4"
          onPress={() => navigation.navigate('map')}
        />
      </Card>
    );
  };

  render() {
    const { listing, like } = this.props;

    return (
      <View style={{ marginTop: 10 }}>
        <Swipe
          data={listing}
          renderCard={this.renderCard}
          renderNoMoreCards={this.renderNoMoreCards}
          onSwipeRight={job => like(job)}
        />
      </View>
    );
  }
}

DeckScreen.defaultProps = {
  listing: [],
};
DeckScreen.propTypes = {
  listing: PropTypes.instanceOf(Array),
  like: PropTypes.func.isRequired,
  clearJobs: PropTypes.func.isRequired,
  navigation: PropTypes.shape({}).isRequired,
};

const mapStateToProps = ({ job: { listing } }) => ({ listing });
const mapDispatchToProps = dispatch => ({
  like: job => dispatch(likeJob(job)),
  clearJobs: () => dispatch(clearListedJobs()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DeckScreen);
