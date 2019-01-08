import { Facebook } from 'expo';
import { AsyncStorage } from 'react-native';
import { FB_LOGIN_SUCCESS, FB_LOGIN_FAIL, FB_LOGOUT } from './types';
import { FB_TOKEN } from './tokens';

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

export const fbLogout = () => async (dispatch) => {
  await AsyncStorage.removeItem(FB_TOKEN);
  return dispatch({ type: FB_LOGOUT });
};
