import { uniqBy } from 'lodash';
import {
  FETCH_JOBS, LIKE_JOB, CLEAR_LIKED_JOB, CLEAR_LISTED_JOB,
} from '../actions/types';

const defaultState = {
  likedJobs: [],
};

export default (state = defaultState, { type, payload }) => {
  switch (type) {
    case FETCH_JOBS:
      return { ...state, ...payload };
    case LIKE_JOB:
      return { ...state, likedJobs: uniqBy([payload, ...state.likedJobs], 'id') };
    case CLEAR_LIKED_JOB:
      return { ...state, likedJobs: [] };
    case CLEAR_LISTED_JOB:
      return { ...state, listings: [] };
    default:
      return state;
  }
};
