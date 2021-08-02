import React, {useContext} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {AuthContext} from '../../navigations/AuthProvider';

const SettingsProfileScreen = () => {
  const {logout} = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text>Settings Screen</Text>
      <Button title="Log out" onPress={() => logout()} />
    </View>
  );
};

export default SettingsProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
