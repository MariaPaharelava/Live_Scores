import React, {useState, useContext} from 'react';
import {View, Text, TouchableOpacity, Image, Pressable} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {AuthContext} from '../../navigations/AuthProvider';
import CheckBox from '@react-native-community/checkbox';
import {LoginButton} from '../../buttons/LoginButton';
import {RoundedButton} from '../../buttons/RoundedButton';

import {IMAGES} from '../../images/Images';
import styles from './SignInScreenStyles';
const SignInScreen = ({navigation}) => {
  const [toggleCheckBox, setToggleCheckBox] = useState(true);
  const {login} = useContext(AuthContext);
  const [dataSignIn, setDataSignIn] = useState({
    email: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });

  const textInputChange = val => {
    if (val.trim().length >= 6) {
      setDataSignIn({
        ...dataSignIn,
        email: val,
        check_textInputChange: true,
        isValidUser: true,
      });
    } else {
      setDataSignIn({
        ...dataSignIn,
        email: val,
        check_textInputChange: false,
        isValidUser: false,
      });
    }
  };

  const handlePasswordChange = val => {
    if (val.trim().length >= 8) {
      setDataSignIn({
        ...dataSignIn,
        password: val,
        isValidPassword: true,
      });
    } else {
      setDataSignIn({
        ...dataSignIn,
        password: val,
        isValidPassword: false,
      });
    }
  };

  const updateSecureTextEntry = () => {
    setDataSignIn({
      ...dataSignIn,
      secureTextEntry: !dataSignIn.secureTextEntry,
    });
  };

  const handleValidUser = val => {
    if (val.trim().length >= 6) {
      setDataSignIn({
        ...dataSignIn,
        isValidUser: true,
      });
    } else {
      setDataSignIn({
        ...dataSignIn,
        isValidUser: false,
      });
    }
  };

  return (
    <View style={styles.container}>
      <Image style={styles.onboardingImage} source={IMAGES.ONBOARDING_IMAGE} />

      <Animatable.View
        animation="fadeInUpBig"
        style={[
          styles.footer,
          {
            backgroundColor: '#222232',
          },
        ]}>
        <Pressable
          style={styles.pressable}
          onPress={() => navigation.navigate('Onboarding')}>
          <View style={styles.hideLine} />
        </Pressable>
        <Text
          style={[
            styles.text_footer,
            {
              color: 'white',
              paddingBottom: 20,
            },
          ]}>
          Welcome
        </Text>

        <LoginButton
          onChangeTextPass={value => handlePasswordChange(value)}
          dataSignIn={dataSignIn}
          onPress={updateSecureTextEntry}
          onChangeText={val => textInputChange(val)}
          onEndEditing={e => handleValidUser(e.nativeEvent.text)}
        />

        {dataSignIn.isValidUser ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>
              Email must be 6 characters long.
            </Text>
          </Animatable.View>
        )}

        {dataSignIn.isValidPassword ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>
              Password must be 8 characters long.
            </Text>
          </Animatable.View>
        )}
        <View style={styles.checkbox}>
          <CheckBox
            disabled={false}
            value={toggleCheckBox}
            onValueChange={newValue => setToggleCheckBox(newValue)}
          />
          <Text style={styles.rememberText}>Remember me</Text>
          <TouchableOpacity>
            <Text style={{color: 'white'}}>Forgot password?</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.button}>
          <RoundedButton
            title="Sign in"
            onPress={() => {
              login(dataSignIn.email, dataSignIn.password);
            }}
          />

          <View style={styles.lastView}>
            <Text style={styles.quastion}>Don't have account?</Text>
            <TouchableOpacity
              style={styles.signupButton}
              onPress={() => navigation.navigate('SignUpScreen')}>
              <Text style={styles.signupButtonText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animatable.View>
    </View>
  );
};

export default SignInScreen;
