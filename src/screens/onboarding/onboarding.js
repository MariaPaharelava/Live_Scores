import React from 'react';
import styles from './OnboardingStyles';
import {IMAGES} from '../../images/Images';
import {RoundedButton} from '../../buttons/RoundedButton';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Button,
} from 'react-native';

function Onboarding() {
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
        <RoundedButton title="Sign in" />

        <TouchableOpacity style={styles.signupButton}>
          <Text style={styles.signupButtonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Onboarding;
