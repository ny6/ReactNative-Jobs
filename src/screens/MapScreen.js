import React, { Component } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { MapView } from 'expo';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';
import PropTypes from 'prop-types';
import { fetchJobs } from '../actions';

const styles = {
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
  },
};

class MapScreen extends Component {
  state = {
    mapLoaded: false,
    region: {
      longitude: -122,
      latitude: 37,
      longitudeDelta: 0.04,
      latitudeDelta: 0.09,
    },
  }

  componentDidMount() {
    this.setState({ mapLoaded: true });
  }

  render() {
    const { buttonContainer } = styles;
    const { fetchData } = this.props;
    const { mapLoaded, region: reg } = this.state;
    if (!mapLoaded) return <View style={{ flex: 1, justifyContent: 'center' }}><ActivityIndicator /></View>;

    return (
      <View style={{ flex: 1 }}>
        <MapView
          style={{ flex: 1 }}
          initialRegion={reg}
          onRegionChangeComplete={region => this.setState({ region })}
        />
        <View style={buttonContainer}>
          <Button
            title="Search This Area"
            backgroundColor="#009688"
            icon={{ name: 'search' }}
            onPress={() => fetchData(reg)}
            large
          />
        </View>
      </View>
    );
  }
}

MapScreen.propTypes = {
  fetchData: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  fetchData: region => dispatch(fetchJobs(region)),
});

export default connect(null, mapDispatchToProps)(MapScreen);
