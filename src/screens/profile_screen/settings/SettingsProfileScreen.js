import React from 'react';
import {View, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Indicator from '../../../component/ActivityIndicator';
import styles from './SettingsProfileScreenStyles';
import {logoutUser} from '../../../redux/actions/AuthActions';
import {RoundedButton} from '../../../buttons/RoundedButton';
import {ProfileData} from '../../../component/ProfileData';
import {PROFILE_IMAGE} from '../../../images/Images';
import {SettingProfileButton} from '../../../buttons/SettingProfileButton';
import {TouchableOpacity} from 'react-native-gesture-handler';
const SettingsProfileScreen = ({navigation}) => {
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
    <View style={styles.profileData}>
      <SettingProfileButton
        title="Edit Profile"
        image={PROFILE_IMAGE.EDIT_IMAGE}
        onPress={() => navigation.navigate('EditProfile')}
      />

      <SettingProfileButton
        title="Logout"
        image={PROFILE_IMAGE.LOGOUT_IMAGE}
        onPress={onUserLogout}
      />
    </View>
  );
};

export default SettingsProfileScreen;
