import axios from 'axios';
import qs from 'qs';
import { Location } from 'expo';
import {
  FETCH_JOBS, LIKE_JOB, CLEAR_LIKED_JOB, CLEAR_LISTED_JOB,
} from './types';

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

export const fetchJobs = (region, cb) => async (dispatch) => {
  try {
    const address = await Location.reverseGeocodeAsync(region);
    const zip = address[0].postalCode;
    const url = createBaseUrl(zip);

    const { data } = await axios.get(url);
    const error = new Error('Something went wrong!');
    if (!data) throw error;
    const { listings, stat } = data;
    if (!listings || stat !== 'ok') throw error;
    if (!listings.listing || listings.listing.length <= 0) throw new Error('No jobs found for this area!');
    dispatch({ type: FETCH_JOBS, payload: listings });
    return cb();
  } catch (err) { return err; }
};

export const likeJob = job => dispatch => dispatch({
  type: LIKE_JOB, payload: job,
});

export const clearLikedJobs = () => dispatch => dispatch({
  type: CLEAR_LIKED_JOB,
});

export const clearListedJobs = () => dispatch => dispatch({
  type: CLEAR_LISTED_JOB,
});
