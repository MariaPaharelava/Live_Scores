import React, {useContext} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {AuthContext} from '../../../navigations/AuthProvider';
import styles from './SettingsProfileScreenStyles';
const SettingsProfileScreen = () => {
  const {logout} = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Settings Screen</Text>
      <Button title="Log out" onPress={() => logout()} />
    </View>
  );
};

export default SettingsProfileScreen;
