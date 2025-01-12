import { GoogleSignin } from '@react-native-google-signin/google-signin';

const configureGoogleSignIn = () => {
  GoogleSignin.configure({
    webClientId: process.env.EXPO_PUBLIC_OAUTH_WEB_CLIENT_ID,
    offlineAccess: true,
    forceCodeForRefreshToken: true
  });
};

export { configureGoogleSignIn, GoogleSignin };