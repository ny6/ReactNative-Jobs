import React, { Component } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { MapView } from 'expo';
import { connect } from 'react-redux';
import { Button, Icon } from 'react-native-elements';
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
  static navigationOptions = {
    title: 'Map',
    tabBarIcon: ({ tintColor }) => (
      <Icon name="my-location" size={25} color={tintColor} />
    ),
  }

  state = {
    isLoading: false,
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

  cbFunc = () => {
    const { navigation } = this.props;
    this.setState({ isLoading: false });
    navigation.navigate('deck');
  }

  onPressFunc = () => {
    const { region: reg } = this.state;
    const { fetchData } = this.props;
    this.setState({ isLoading: true });
    fetchData(reg, this.cbFunc);
  }

  render() {
    const { buttonContainer } = styles;
    const { isLoading, mapLoaded, region: reg } = this.state;
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
            title={isLoading ? '' : 'Search This Area'}
            backgroundColor="#009688"
            icon={isLoading ? {} : { name: 'search' }}
            onPress={this.onPressFunc}
            large
            loading={isLoading}
          />
        </View>
      </View>
    );
  }
}

MapScreen.propTypes = {
  fetchData: PropTypes.func.isRequired,
  navigation: PropTypes.shape({}).isRequired,
};

const mapDispatchToProps = dispatch => ({
  fetchData: (region, cb) => dispatch(fetchJobs(region, cb)),
});

export default connect(null, mapDispatchToProps)(MapScreen);
