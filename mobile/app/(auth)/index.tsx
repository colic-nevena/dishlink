import React from 'react';
import { ActivityIndicator, Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';
import { useFonts } from 'expo-font';
import colors from '@/constants/Colors';
import { Routes } from '@/constants/Routes';
import AppButton from '@/components/AppButton';
import Styles from '@/constants/Styles';

export default function WelcomeScreen() {
  const [fontsLoaded] = useFonts({
    Pacifico: require('../../assets/fonts/Pacifico-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={colors.primary || '#000'} />
      </View>
    );
  }

  return (
    <ImageBackground
      blurRadius={3}
      style={styles.background}
      source={require('../../assets/images/background.webp')}
    >
      <View style={styles.logoContainer}>
        <Text style={styles.tagline}>Your cooking companion</Text>
        <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
      </View>

      <View style={styles.buttonContainer}>
        <Link href={Routes.LOGIN} asChild>
          <AppButton title="Login" color={colors.secondary} />
        </Link>

        <Link href={Routes.REGISTER} asChild>
          <AppButton color={colors.primary} title="Register" />
        </Link>
      </View>
    </ImageBackground>
  );
}

WelcomeScreen.options = {
  headerShown: false,
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // Optional: white background during loading
  },
  tagline: {
    fontSize: 30,
    fontFamily: 'Pacifico',
    paddingVertical: 20,
    textAlign: 'center',
    color: Styles.colors.darkGrey,
  },
  background: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  buttonContainer: {
    padding: 20,
    width: '100%',
  },
  logoContainer: {
    position: 'absolute',
    top: 30,
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
  },
});
