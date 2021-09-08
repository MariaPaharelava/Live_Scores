import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {RoundedButton} from '../../buttons/RoundedButton';
import styles from './OnboardingStyles';
import {IMAGES} from '../../images/Images';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Onboarding({navigation}) {
  const storeData = async () => {
    try {
      await AsyncStorage.setItem('alreadyLaunched', 'true');
    } catch (e) {
      // saving error
    }
  };
  return (
    <View style={styles.container}>
      <Image style={styles.onboardingImage} source={IMAGES.ONBOARDING_IMAGE} />
      <View style={styles.onboardingText}>
        <Text style={styles.firstSection}>Discover all about sport</Text>
        <Text style={styles.secondSection}>
          Search millions of jobs and get the inside scoop on companies. Wait
          for what? Let’s get start it!
        </Text>
      </View>
      <View style={styles.buttons}>
        <RoundedButton
          title="Sign in"
          onPress={() => {
            storeData();
            navigation.navigate('SignInScreen');
          }}
        />

        <TouchableOpacity
          style={styles.signupButton}
          onPress={() => {
            storeData();

            navigation.navigate('SignUpScreen');
          }}>
          <Text style={styles.signupButtonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Onboarding;
