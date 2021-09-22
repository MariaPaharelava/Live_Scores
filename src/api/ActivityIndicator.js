import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';

const Indicator = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color="#def5ff" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // width: '100%',
    // height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#181829',
  },
});

export default Indicator;
