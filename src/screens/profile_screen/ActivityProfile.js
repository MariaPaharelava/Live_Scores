import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

const ActivityProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Activity Screen</Text>
      <Button title="Click Here" onPress={() => alert('Button Clicked!')} />
    </View>
  );
};

export default ActivityProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
