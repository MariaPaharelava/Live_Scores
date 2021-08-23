import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

const ExploreScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>Explore Screen,Onboarding</Text>
      <Button
        title="Click Here"
        onPress={() => navigation.navigate('Onboarding')}
      />
    </View>
  );
};

export default ExploreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
