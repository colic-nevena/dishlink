import React from "react"
import { Link, Stack } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import { Routes } from '../constants/Routes';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops! This screen doesn't exist" }} />
      <View style={styles.container}>
        <Link href={Routes.HOME}>Go back home</Link>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
