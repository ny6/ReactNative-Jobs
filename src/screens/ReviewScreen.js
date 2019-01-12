import React, { Component } from 'react';
import {
  Text, ScrollView, View, Linking, Platform,
} from 'react-native';
import { Icon, Card, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { MapView } from 'expo';
import { getLatLng, mb10, textBold } from './DeckScreen';

class ReviewScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'Review Jobs',
    headerRight: (
      <Icon
        name="settings"
        onPress={() => navigation.navigate('settings')}
        color="rgba(0, 122, 255, 1)"
      />
    ),
  })

  render() {
    const { likedJobs } = this.props;
    return (
      <ScrollView>
        {likedJobs.map(job => (
          <Card key={job.id}>
            <View style={{ height: 200 }}>
              <MapView
                style={[{ flex: 1 }, mb10]}
                cacheEnabled={Platform.OS === 'android'}
                scrollEnabled={false}
                initialRegion={getLatLng()}
              />
              <View style={mb10}>
                <Text style={textBold}>{job.company.name}</Text>
              </View>
              <Button
                title="Apply Now"
                backgroundColor="#03A9F4"
                onPress={() => Linking.openURL(job.apply_url)}
              />
            </View>
          </Card>
        ))}
      </ScrollView>
    );
  }
}

ReviewScreen.defaultProps = {
  likedJobs: [],
};
ReviewScreen.propTypes = {
  likedJobs: PropTypes.instanceOf(Array),
};

const mapStateToProps = ({ job: { likedJobs } }) => ({ likedJobs });

export default connect(mapStateToProps)(ReviewScreen);
