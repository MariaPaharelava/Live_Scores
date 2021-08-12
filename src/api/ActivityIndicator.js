import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';

const Indicator = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color="white" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'gray',
  },
});

export default Indicator;
