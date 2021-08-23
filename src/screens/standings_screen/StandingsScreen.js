import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

const StandingsScreen = () => {
  return (
    <View style={styles.container}>
      <Text>StandingsScreen Screen</Text>
      <Button title="Click Here" onPress={() => alert('Button Clicked!')} />
    </View>
  );
};

export default StandingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
