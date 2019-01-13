import { FETCH_JOBS, CLEAR_LISTED_JOB } from '../actions/types';

export default (state = {}, { type, payload }) => {
  switch (type) {
    case FETCH_JOBS:
      return { ...state, ...payload };
    case CLEAR_LISTED_JOB:
      return { ...state, listings: [] };
    default:
      return state;
  }
};
