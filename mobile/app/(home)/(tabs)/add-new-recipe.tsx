import { View, Text, StyleSheet } from 'react-native';

export default function AddNewRecipeScreen() {
  return (
    <View style={styles.container}>
      <Text>Add New Recipe</Text>
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
