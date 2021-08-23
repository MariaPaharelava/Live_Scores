import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Image,
  Pressable,
} from 'react-native';
import * as Animatable from 'react-native-animatable';

import {AuthContext} from '../../components/context';
import CheckBox from '@react-native-community/checkbox';
import {LoginButton} from '../../buttons/LoginButton';
import {RoundedButton} from '../../buttons/RoundedButton';

import Users from '../../model/users';
import {IMAGES} from '../../images/Images';
import styles from './SignInScreenStyles';
const SignInScreen = ({navigation}) => {
  const [toggleCheckBox, setToggleCheckBox] = useState(true);

  const [data, setData] = useState({
    email: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });

  const {signIn} = React.useContext(AuthContext);

  const textInputChange = val => {
    if (val.trim().length >= 6) {
      setData({
        ...data,
        email: val,
        check_textInputChange: true,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        email: val,
        check_textInputChange: false,
        isValidUser: false,
      });
    }
  };

  const handlePasswordChange = val => {
    if (val.trim().length >= 8) {
      setData({
        ...data,
        password: val,
        isValidPassword: true,
      });
    } else {
      setData({
        ...data,
        password: val,
        isValidPassword: false,
      });
    }
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const handleValidUser = val => {
    if (val.trim().length >= 6) {
      setData({
        ...data,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        isValidUser: false,
      });
    }
  };

  const loginHandle = (userEmail, password) => {
    const foundUser = Users.filter(item => {
      return userEmail == item.email && password == item.password;
    });

    if (data.email.length == 0 || data.password.length == 0) {
      Alert.alert('Wrong Input!', 'Email or password field cannot be empty.', [
        {text: 'Okay'},
      ]);
      return;
    }

    if (foundUser.length == 0) {
      Alert.alert('Invalid Email!', 'Email or password is incorrect.', [
        {text: 'Okay'},
      ]);
      return;
    }
    signIn(foundUser);
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
        <Pressable style={styles.pressable} onPress={() => navigation.goBack()}>
          <View style={styles.hideLine} />
        </Pressable>
        <Text
          style={[
            styles.text_footer,
            {
              color: 'white',
            },
          ]}>
          Welcome
        </Text>

        <LoginButton
          onChangeTextPass={value => handlePasswordChange(value)}
          data={data}
          onPress={updateSecureTextEntry}
          onChangeText={val => textInputChange(val)}
          onEndEditing={e => handleValidUser(e.nativeEvent.text)}
        />

        {data.isValidUser ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>
              Email must be 6 characters long.
            </Text>
          </Animatable.View>
        )}

        {data.isValidPassword ? null : (
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
          <TouchableOpacity>
            <Text style={{color: 'white', marginTop: 15}}>
              Forgot password?
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.button}>
          <RoundedButton
            title="Sign in"
            onPress={() => {
              loginHandle(data.email, data.password);
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
