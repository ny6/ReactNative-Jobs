import { uniqBy } from 'lodash';
import { PERSIST_REHYDRATE } from 'redux-persist/lib/constants';
import { LIKE_JOB, CLEAR_LIKED_JOB } from '../actions/types';

export default (state = [], { type, payload }) => {
  switch (type) {
    case PERSIST_REHYDRATE:
      return payload.likedJobs || [];
    case LIKE_JOB:
      return uniqBy([payload, ...state], 'id');
    case CLEAR_LIKED_JOB:
      return [];
    default:
      return state;
  }
};
