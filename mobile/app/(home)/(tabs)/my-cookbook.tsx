import { View, Text, StyleSheet } from 'react-native';

export default function MyCookbookScreen() {
  return (
    <View style={styles.container}>
      <Text>My Cookbook</Text>
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
