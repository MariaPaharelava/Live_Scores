import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View, Alert} from 'react-native';

const createButtonAlert = () =>
  Alert.alert(
    Alert.alert('OOPS!', 'Error with uploading files', [
      {text: 'Retry', onPress: () => console.log('closed')},
    ]),
  );
const Error = () => <View style={styles.container}>{createButtonAlert}</View>;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Error;
