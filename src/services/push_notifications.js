import { Permissions, Notifications } from 'expo';
import { AsyncStorage } from 'react-native';
import axios from 'axios';

export default async () => {
  const previousToken = await AsyncStorage.getItem('pushtoken');
  if (previousToken) return previousToken;

  const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  if (status !== 'granted') return null;

  const token = await Notifications.getExpoPushTokenAsync();
  if (!token) return null;

  await axios.post('https://rallycoding.herokuapp.com/api/tokens', { token: { token } });
  await AsyncStorage.setItem('pushtoken', token);
  return token;
};
