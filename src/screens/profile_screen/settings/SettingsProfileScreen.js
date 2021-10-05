import React from 'react';
import {View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Indicator from '../../../component/ActivityIndicator';
import styles from './SettingsProfileScreenStyles';
import {logoutUser} from '../../../redux/actions/AuthActions';
import {PROFILE_IMAGE} from '../../../images/Images';
import {SettingProfileButton} from '../../../buttons/SettingProfileButton';
const SettingsProfileScreen = ({navigation, userData, sport}) => {
  const loading = useSelector(state => state.AuthReducer.logoutProcessing);
  const error = useSelector(state => state.AuthReducer.logoutError);
  const dispatch = useDispatch();
  console.log(navigation);

  if (loading) {
    return <Indicator />;
  }

  const onUserLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <View>
      <SettingProfileButton
        title="Edit Profile"
        image={PROFILE_IMAGE.EDIT_IMAGE}
        onPress={() =>
          navigation.navigate('EditProfile', {
            data: userData,
            sport: sport,
          })
        }
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
