import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {RoundedButton} from '../../buttons/RoundedButton';
import styles from './OnboardingStyles';
import {IMAGES} from '../../images/Images';

function Onboarding({navigation}) {
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
          onPress={() => navigation.navigate('SignInScreen')}
        />

        <TouchableOpacity
          style={styles.signupButton}
          onPress={() => navigation.navigate('SignUpScreen')}>
          <Text style={styles.signupButtonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Onboarding;
