import React from 'react';
import {View, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Indicator from '../../../component/ActivityIndicator';
import styles from './SettingsProfileScreenStyles';
import {logoutUser} from '../../../redux/actions/AuthActions';
import {RoundedButton} from '../../../buttons/RoundedButton';
const SettingsProfileScreen = () => {
  const loading = useSelector(state => state.AuthReducer.logoutProcessing);
  const error = useSelector(state => state.AuthReducer.logoutError);
  const dispatch = useDispatch();

  if (loading) {
    return <Indicator />;
  }

  const onUserLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Settings Screen</Text>
      <RoundedButton title="Sign out" onPress={onUserLogout} />
      {!!error && <Text>{error.message}</Text>}
    </View>
  );
};

export default SettingsProfileScreen;
