import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {IMAGES} from '../../../images/Images';
import {NavigateButton} from '../../../buttons/NavigateButton';
import {ProfileData} from '../../../component/ProfileData';
import styles from './ProfileScreenStyles';
import ActivityProfileScreen from '../activity/ActivityProfileScreen';
import SettingsProfileScreen from '../settings/SettingsProfileScreen';
import {PROFILE_IMAGE} from '../../../images/Images';
const ProfileScreen = ({navigation}) => {
  const [view, setView] = useState('profile');

  const options = [
    {label: 'My Profile', value: 'profile'},
    {label: 'Activity', value: 'activity'},
    {label: ' Settings', value: 'settings'},
  ];
  const selectedView = () => {
    switch (view) {
      case 'profile':
        return (
          <View style={styles.profileData}>
            <ProfileData
              title="Name"
              titleInfo="Brian Imanuel"
              image={PROFILE_IMAGE.PROFILE_IMAGE}
            />
            <ProfileData
              title="Email"
              titleInfo="brians213@gmail.com"
              image={PROFILE_IMAGE.EMAIL_IMAGE}
            />
          </View>
        );

      case 'activity':
        return <ActivityProfileScreen />;
      case 'settings':
        return <SettingsProfileScreen navigation={navigation} />;
      default:
        return;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerImage}>
        <ImageBackground style={styles.userImg} source={IMAGES.PROFILE_IMAGE}>
          <TouchableOpacity style={styles.userEditContainer}>
            <Image
              style={styles.userEditImg}
              source={PROFILE_IMAGE.EDITIMAGE_IMAGE}
            />
          </TouchableOpacity>
        </ImageBackground>
        <Text style={styles.userName}>Brian Imanuel</Text>
      </View>

      <View style={styles.navigate}>
        {options.map(item => (
          <NavigateButton
            key={item.label}
            title={item.label}
            width={100}
            height={50}
            color={view === item.value ? '#ED6B4E' : '#00000000'}
            onPress={() => {
              setView(item.value);
            }}
          />
        ))}
      </View>
      <ScrollView>{selectedView()}</ScrollView>
    </View>
  );
};

export default ProfileScreen;
