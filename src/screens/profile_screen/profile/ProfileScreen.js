import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, ImageBackground} from 'react-native';
import {NavigateButton} from '../../../buttons/NavigateButton';
import {ProfileData} from '../../../component/ProfileData';
import styles from './ProfileScreenStyles';
import SettingsProfileScreen from '../settings/SettingsProfileScreen';
import firestore from '@react-native-firebase/firestore';
import Error from '../../../component/ErrorIndicator';
import Indicator from '../../../component/ActivityIndicator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {PROFILE_IMAGE} from '../../../images/Images';
import ActivityProfileScreen from '../activity/ActivityProfileScreen.js';
const ProfileScreen = ({navigation, route}) => {
  const [view, setView] = useState('profile');
  const [userData, setUserData] = useState();
  const [user, setUser] = useState();
  const [sport, setSport] = useState();
  const [userLoading, setuserLoading] = useState();
  const [userError, setuserError] = useState();
  const [imageLoading, setimageLoading] = useState();

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
  const Capitalize = str => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  useEffect(() => {
    AsyncStorage.getItem('User').then(value => {
      setUser(value);
    });
    AsyncStorage.getItem('@storage_Key').then(sport => {
      setSport(sport);
    });
    getUser();
    navigation.addListener('focus', () => setuserLoading(!userLoading));
  }, [navigation, userLoading]);

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
              titleInfo={userData ? userData.name : ''}
              image={PROFILE_IMAGE.PROFILE_IMAGE}
            />
            <ProfileData
              title="Startup sport"
              titleInfo={Capitalize(sport)}
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
        return <ActivityProfileScreen navigation={navigation} />;
      case 'settings':
        return (
          <View style={styles.profileData}>
            <SettingsProfileScreen
              navigation={navigation}
              userData={userData}
              sport={sport}
            />
          </View>
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
          imageStyle={{borderRadius: 150}}
          source={{
            uri: userData
              ? userData.userImg ||
                'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg'
              : 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg',
          }}
          onLoadStart={() => setimageLoading(true)}
          onLoadEnd={() => setimageLoading(false)}>
          {imageLoading && <Indicator />}
        </ImageBackground>

        <Text style={styles.userName}>{userData ? userData.name : ''}</Text>
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
      <View style={{width: '100%', flex: 1}}>{selectedView()}</View>
    </View>
  );
};

export default ProfileScreen;
