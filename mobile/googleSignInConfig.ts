import { GoogleSignin } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId: process.env.EXPO_PUBLIC_OAUTH_CLIENT_ID,
  offlineAccess: true,
});