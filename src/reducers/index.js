import { combineReducers } from 'redux';
import auth from './authReducer';
import job from './jobReducer';

export default combineReducers({
  auth, job,
});
