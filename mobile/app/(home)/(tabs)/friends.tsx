import { View, Text, StyleSheet } from 'react-native';

export default function FriendsScreen() {
  return (
    <View style={styles.container}>
      <Text>Friends</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
