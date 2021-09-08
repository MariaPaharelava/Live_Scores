import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import styles from './CameraScreenStyles';
const CameraScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Camera Screen</Text>
      <Button title="Click Here" onPress={() => alert('Button Clicked!')} />
    </View>
  );
};

export default CameraScreen;
