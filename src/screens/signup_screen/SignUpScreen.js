import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import styles from './SignUpScreenStyles';
import Hide from '../../icons/login/Hide.svg';
import Show from '../../icons/login/Show.svg';
import {AuthContext} from '../../navigations/AuthProvider';
const SignUpScreen = ({navigation}) => {
  const {register} = useContext(AuthContext);
  const [dataSignUP, setDataSignUP] = useState({
    email: '',
    password: '',
    confirm_password: '',
    check_textInputChange: false,
    secureTextEntry: true,
    confirm_secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
    isValidConfirmPassword: true,
    pressed: false,
  });

  const textInputChange = val => {
    if (val.trim().length >= 6) {
      setDataSignUP({
        ...dataSignUP,
        email: val,
        check_textInputChange: true,
        isValidUser: true,
      });
    } else {
      setDataSignUP({
        ...dataSignUP,
        email: val,
        check_textInputChange: false,
        isValidUser: false,
      });
    }
  };

  const handlePasswordChange = val => {
    if (val.trim().length >= 8) {
      setDataSignUP({
        ...dataSignUP,
        password: val,
        isValidPassword: true,
      });
    } else {
      setDataSignUP({
        ...dataSignUP,
        password: val,
        isValidPassword: false,
      });
    }
  };
  const handleConfirmPasswordChange = val => {
    if (val.trim().length >= 8) {
      setDataSignUP({
        ...dataSignUP,
        confirm_password: val,
        isValidConfirmPassword: true,
      });
    } else {
      setDataSignUP({
        ...dataSignUP,
        confirm_password: val,
        isValidConfirmPassword: false,
      });
    }
  };
  const hanldeSignUp = () => {
    if (dataSignUP.password == dataSignUP.confirm_password) {
      register(dataSignUP.email, dataSignUP.password);
    } else {
      Alert.alert('Password mismatch');
    }
  };

  const updateSecureTextEntry = () => {
    setDataSignUP({
      ...dataSignUP,
      secureTextEntry: !dataSignUP.secureTextEntry,
    });
  };
  const updateConfirmSecureTextEntry = () => {
    setDataSignUP({
      ...dataSignUP,
      confirm_secureTextEntry: !dataSignUP.confirm_secureTextEntry,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text_header}>Register Now!</Text>
      </View>
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <ScrollView>
          <Text style={styles.text_footer}>Email</Text>
          <View style={styles.action}>
            <TextInput
              placeholder="Your Email"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={val => textInputChange(val)}
            />
          </View>
          {dataSignUP.isValidUser ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>
                Email must be 6 characters long.
              </Text>
            </Animatable.View>
          )}

          <Text
            style={[
              styles.text_footer,
              {
                marginTop: 35,
              },
            ]}>
            Password
          </Text>
          <View style={styles.action}>
            <TextInput
              placeholder="Your Password"
              secureTextEntry={dataSignUP.secureTextEntry ? true : false}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={val => handlePasswordChange(val)}
            />
            <TouchableOpacity onPress={updateSecureTextEntry}>
              {dataSignUP.secureTextEntry ? <Hide /> : <Show />}
            </TouchableOpacity>
          </View>
          {dataSignUP.isValidPassword ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>
                Password must be 8 characters long.
              </Text>
            </Animatable.View>
          )}
          <Text
            style={[
              styles.text_footer,
              {
                marginTop: 35,
              },
            ]}>
            Confirm Password
          </Text>

          <View style={styles.action}>
            <TextInput
              placeholder="Confirm Your Password"
              secureTextEntry={
                dataSignUP.confirm_secureTextEntry ? true : false
              }
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={val => handleConfirmPasswordChange(val)}
            />
            <TouchableOpacity onPress={updateConfirmSecureTextEntry}>
              {dataSignUP.confirm_secureTextEntry ? <Hide /> : <Show />}
            </TouchableOpacity>
          </View>
          {dataSignUP.isValidConfirmPassword ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>must be 8 characters long.</Text>
            </Animatable.View>
          )}
          <View style={styles.textPrivate}>
            <Text style={styles.color_textPrivate}>
              By signing up you agree to our
            </Text>
            <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>
              {' '}
              Terms of service
            </Text>
            <Text style={styles.color_textPrivate}> and</Text>
            <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>
              {' '}
              Privacy policy
            </Text>
          </View>
          <View style={styles.button}>
            <TouchableOpacity style={styles.signIn} onPress={hanldeSignUp}>
              <View colors={['#246BFD', '#246BFD']} style={styles.signIn}>
                <Text
                  style={[
                    styles.textSign,
                    {
                      color: 'black',
                    },
                  ]}>
                  Sign Up
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('SignInScreen')}
              style={[
                styles.signIn,
                {
                  borderColor: '#246BFD',
                  borderWidth: 1,
                  marginTop: 15,
                },
              ]}>
              <Text
                style={[
                  styles.textSign,
                  {
                    color: '#246BFD',
                  },
                ]}>
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Animatable.View>
    </View>
  );
};

export default SignUpScreen;
