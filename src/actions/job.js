import axios from 'axios';
import qs from 'qs';
import { Location } from 'expo';
import { FETCH_JOBS } from './types';

const createBaseUrl = (l) => {
  const baseUrl = 'https://authenticjobs.com/api/?';
  const params = {
    api_key: '5e0edf6642d7776ea126bc7d6e765bfc',
    method: 'aj.jobs.search',
    perpage: '10',
    format: 'json',
  };
  const url = baseUrl + qs.stringify({ ...params, l });
  return url;
};

export const fetchJobs = region => async (dispatch) => { // eslint-disable-line
  try {
    const address = await Location.reverseGeocodeAsync({
      longitude: -122,
      latitude: 37,
      longitudeDelta: 0.04,
      latitudeDelta: 0.09,
    });
    const zip = address[0].postalCode;
    const url = createBaseUrl(zip);

    const { data } = await axios.get(url);
    if (!data) throw new Error('Something went wrong!');

    return dispatch({ type: FETCH_JOBS, payload: data });
  } catch (err) { return err; }
};
