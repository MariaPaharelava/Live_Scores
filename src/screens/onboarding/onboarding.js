import React from 'react';
import styles from './styles';
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
      <Image
        style={styles.onboarding_image}
        source={require('./onboarding_image.png')}
      />
      <View style={styles.onboarding_text}>
        <Text style={styles.first_section}>Discover all about sport</Text>
        <Text style={styles.second_section}>
          Search millions of jobs and get the inside scoop on companies. Wait
          for what? Let’s get start it!
        </Text>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.signin_button}>
          <Text style={styles.signin_button_text}>Sign in</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.signup_button}>
          <Text style={styles.signup_button_text}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Onboarding;
