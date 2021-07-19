import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {RoundedButton} from '../../buttons/RoundedButton';
import LoginScreen from '../login_screen/LoginScreen';
import styles from './OnboardingStyles';
import {IMAGES} from '../../images/Images';

function Onboarding() {
  const [modalVisible, setModalVisible] = useState(false);

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
        <RoundedButton title="Sign in" onPress={() => setModalVisible(true)} />
        <LoginScreen visible={modalVisible} setVisible={setModalVisible} />

        <TouchableOpacity style={styles.signupButton}>
          <Text style={styles.signupButtonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Onboarding;
