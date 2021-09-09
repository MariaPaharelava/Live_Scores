import React, {useEffect, useState} from 'react';
import {View, TextInput, Alert} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import firestore from '@react-native-firebase/firestore';
import FormButton from '../../../component/FormButton';
import styles from './EditProfileScreenStyles';
const EditProfileScreen = ({navigation, route}) => {
  const {data} = route.params;

  const [userData, setUserData] = useState(data);
  const [user, setUser] = useState();
  useEffect(() => {
    AsyncStorage.getItem('User').then(value => {
      setUser(value);
    });
  }, []);

  const handleUpdate = async () => {
    firestore()
      .collection('users')
      .doc(user)
      .update({
        fname: userData.fname,
        lname: userData.lname,
      })
      .then(() => {
        Alert.alert(
          'Profile Updated!',
          'Your profile has been updated successfully.',
        );
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.action}>
        <TextInput
          placeholder="First Name"
          placeholderTextColor="#666666"
          autoCorrect={false}
          value={userData ? userData.fname : ''}
          onChangeText={txt => setUserData({...userData, fname: txt})}
          style={styles.textInput}
        />
      </View>
      <View style={styles.action}>
        <TextInput
          placeholder="Last Name"
          placeholderTextColor="#666666"
          value={userData ? userData.lname : ''}
          onChangeText={txt => setUserData({...userData, lname: txt})}
          autoCorrect={false}
          style={styles.textInput}
        />
      </View>

      <FormButton buttonTitle="Update" onPress={handleUpdate} />
    </View>
  );
};

export default EditProfileScreen;
