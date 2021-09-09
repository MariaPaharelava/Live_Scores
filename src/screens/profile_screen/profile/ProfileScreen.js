import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {NavigateButton} from '../../../buttons/NavigateButton';
import {ProfileData} from '../../../component/ProfileData';
import styles from './ProfileScreenStyles';
import ActivityProfileScreen from '../activity/ActivityProfileScreen';
import SettingsProfileScreen from '../settings/SettingsProfileScreen';
import {PROFILE_IMAGE} from '../../../images/Images';
import firestore from '@react-native-firebase/firestore';
import Error from '../../../component/ErrorIndicator';
import Indicator from '../../../component/ActivityIndicator';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = ({navigation, route}) => {
  const [view, setView] = useState('profile');
  const [userData, setUserData] = useState();
  const [user, setUser] = useState();
  const [userLoading, setuserLoading] = useState();
  const [userError, setuserError] = useState();

  const getUser = async () => {
    try {
      const currentUser = await firestore()
        .collection('users')
        .doc(user)
        .get()
        .then(documentSnapshot => {
          if (documentSnapshot.exists) {
            setUserData(documentSnapshot.data());
          }
        });
    } catch (error) {
      setuserError(error);
      console.log(error);
    } finally {
      setuserLoading(false);
    }
  };

  useEffect(() => {
    AsyncStorage.getItem('User').then(value => {
      setUser(value);
    });
    getUser();
    navigation.addListener('focus', () => setuserLoading(!userLoading));
  }, [navigation, userLoading]);

  const options = [
    {label: 'My Profile', value: 'profile'},
    {label: 'Activity', value: 'activity'},
    {label: ' Settings', value: 'settings'},
  ];
  user;
  const selectedView = () => {
    switch (view) {
      case 'profile':
        return (
          <View style={styles.profileData}>
            <ProfileData
              title="First Name"
              titleInfo={userData ? userData.fname : ''}
              image={PROFILE_IMAGE.PROFILE_IMAGE}
            />
            <ProfileData
              title="Last Name"
              titleInfo={userData ? userData.lname : ''}
              image={PROFILE_IMAGE.PROFILE_IMAGE}
            />
            <ProfileData
              title="Email"
              titleInfo={userData ? userData.email : ''}
              image={PROFILE_IMAGE.EMAIL_IMAGE}
            />
          </View>
        );

      case 'activity':
        return <ActivityProfileScreen />;
      case 'settings':
        return (
          <SettingsProfileScreen navigation={navigation} userData={userData} />
        );
      default:
        return;
    }
  };

  if (!userData) {
    return <Indicator />;
  }
  if (userError) {
    return <Error />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerImage}>
        <ImageBackground
          style={styles.userImg}
          source={{
            uri: userData
              ? userData.userImg ||
                'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg'
              : 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg',
          }}>
          <TouchableOpacity style={styles.userEditContainer}>
            <Image
              style={styles.userEditImg}
              source={PROFILE_IMAGE.EDITIMAGE_IMAGE}
            />
          </TouchableOpacity>
        </ImageBackground>
        <Text style={styles.userName}>
          {userData ? userData.fname : ''} {userData ? userData.lname : ''}
        </Text>
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
