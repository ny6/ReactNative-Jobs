import { Facebook } from 'expo';
import { AsyncStorage } from 'react-native';
import { FB_TOKEN } from './tokens';
import {
  FB_LOGIN_SUCCESS, FB_LOGIN_FAIL, FB_LOGOUT,
  LOGIN_STATUS, CLEAR_LIKED_JOB,
} from './types';

export const loggedInStatus = () => async (dispatch) => {
  try {
    const tokenExists = await AsyncStorage.getItem(FB_TOKEN);
    return dispatch({ type: LOGIN_STATUS, payload: !!tokenExists });
  } catch (err) { return dispatch({ type: LOGIN_STATUS, payload: null }); }
};

export const fbLogin = () => async (dispatch) => {
  try {
    const tokenExists = await AsyncStorage.getItem(FB_TOKEN);
    if (tokenExists) return dispatch({ type: FB_LOGIN_SUCCESS, payload: tokenExists });

    const { type, token } = await Facebook.logInWithReadPermissionsAsync('339496990113501', {
      permissions: ['public_profile'],
    });
    if (type === 'cancel') return dispatch({ type: FB_LOGIN_FAIL });

    await AsyncStorage.setItem(FB_TOKEN, token);

    return dispatch({ type: FB_LOGIN_SUCCESS, payload: token });
  } catch (err) { return dispatch({ type: FB_LOGIN_FAIL }); }
};

export const fbLogout = navigation => async (dispatch) => {
  await AsyncStorage.removeItem(FB_TOKEN);
  dispatch({ type: FB_LOGOUT });
  dispatch({ type: CLEAR_LIKED_JOB });
  return navigation.navigate('welcome');
};
