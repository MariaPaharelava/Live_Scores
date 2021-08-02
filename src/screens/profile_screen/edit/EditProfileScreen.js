import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import styles from './EditProfileScreenStyles';
const EditProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>EditProfile Screen </Text>
      <Button title="Click Here" onPress={() => alert('Button Clicked!')} />
    </View>
  );
};

export default EditProfileScreen;
