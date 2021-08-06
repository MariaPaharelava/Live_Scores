import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

const LineUp = () => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.formText}>Formation</Text>
        <Text style={styles.scheme}>Formation</Text>
      </View>
    </View>
  );
};

export default LineUp;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  formText: {},
  scheme: {},
});
