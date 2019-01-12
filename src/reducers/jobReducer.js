import { FETCH_JOBS } from '../actions/types';

export default (state = {}, { type, payload }) => {
  switch (type) {
    case FETCH_JOBS:
      return { ...state, ...payload };
    default:
      return state;
  }
};
