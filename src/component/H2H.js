import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

const H2H = () => {
  return (
    <View style={styles.container}>
      <Text style={{color: 'white'}}>H2H Screen</Text>
      <Button title="Click Here" onPress={() => alert('Button Clicked!')} />
    </View>
  );
};

export default H2H;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
