import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
const LeaguesScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>LeaguesScreen Screen </Text>
      <Button title="Click Here" onPress={() => alert('Button Clicked!')} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#181829',
  },
  text: {
    color: 'white',
  },
});

export default LeaguesScreen;
