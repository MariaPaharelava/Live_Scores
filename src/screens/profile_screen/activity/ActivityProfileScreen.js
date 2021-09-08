import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import styles from './ActivityProfileScreenStyles';
const ActivityProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Activity Screen</Text>
      <Button title="Click Here" onPress={() => alert('Button Clicked!')} />
    </View>
  );
};

export default ActivityProfileScreen;
