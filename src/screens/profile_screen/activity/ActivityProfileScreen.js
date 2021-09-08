import React from 'react';
import {View, Text, Button, StyleSheet, TouchableOpacity} from 'react-native';
import styles from './ActivityProfileScreenStyles';
const ActivityProfileScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Activity Screen</Text>
      <Button title="Click Here" onPress={() => alert('Button Clicked!')} />
    </View>
  );
};

export default ActivityProfileScreen;
