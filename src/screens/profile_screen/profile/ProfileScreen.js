import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {AuthContext} from '../../../navigations/AuthProvider';
import {IMAGES} from '../../../images/Images';
import {ProfileButton} from '../../../buttons/ProfileButton';
import styles from './ProfileScreenStyles';
const ProfileScreen = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#181829'}}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}
        showsVerticalScrollIndicator={false}>
        <View>
          <ImageBackground style={styles.userImg} source={IMAGES.PROFILE_IMAGE}>
            <TouchableOpacity style={styles.userEditContainer}>
              <Image
                style={styles.userEditImg}
                source={require('../../../images/profile/ProfileEdit.png')}
              />
            </TouchableOpacity>
          </ImageBackground>
        </View>
        <Text style={styles.userName}>Brian Imanuel</Text>
        <View style={styles.userBtnWrapper}>
          <TouchableOpacity
            style={[styles.userBtn, {backgroundColor: 'orange'}]}>
            <Text style={styles.userBtnTxt}>My Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.userBtn}
            onPress={() => {
              navigation.navigate('ActivityProfile');
            }}>
            <Text style={styles.userBtnTxt}>Activity</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.userBtn}
            onPress={() => {
              navigation.navigate('SettingsProfile');
            }}>
            <Text style={styles.userBtnTxt}>Settings</Text>
          </TouchableOpacity>
        </View>
        <ProfileButton
          title="Name"
          titleInfo="Brian Imanuel"
          image={require('../../../images/profile/Profile.png')}
          onPress={() => navigation.navigate('EditProfile')}
        />
        <ProfileButton
          title="Email"
          titleInfo="brians213@gmail.com"
          image={require('../../../images/profile/ProfileEmail.png')}
          onPress={() => navigation.navigate('EditProfile')}
        />
        <ProfileButton
          title="Phone"
          titleInfo="+62 821 560 641"
          image={require('../../../images/profile/ProfilePhone.png')}
          onPress={() => navigation.navigate('EditProfile')}
        />
        <ProfileButton
          title="Adress"
          titleInfo="Long beach, California"
          image={require('../../../images/profile/ProfileAdress.png')}
          onPress={() => navigation.navigate('EditProfile')}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
