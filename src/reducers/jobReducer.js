import { uniqBy } from 'lodash';
import { FETCH_JOBS, LIKE_JOB } from '../actions/types';

const defaultState = {
  likedJobs: [],
};

export default (state = defaultState, { type, payload }) => {
  switch (type) {
    case FETCH_JOBS:
      return { ...state, ...payload };
    case LIKE_JOB:
      return { ...state, likedJobs: uniqBy([payload, ...state.likedJobs], 'id') };
    default:
      return state;
  }
};
