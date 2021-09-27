import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Onboarding from '../screens/onboarding/onboarding';
import SignInScreen from '../screens/signin_screen/SignInScreen';
import SignUpScreen from '../screens/signup_screen/SignUpScreen';
import ForgotPasswordScreen from '../screens/forgotpassword_screen/ForgotpasswordScreen';
const Stack = createStackNavigator();

const AuthStack = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);
  let routeName;

  useEffect(() => {
    AsyncStorage.getItem('alreadyLaunched').then(value => {
      if (value !== 'true') {
        AsyncStorage.setItem('alreadyLaunched', 'false');
        setIsFirstLaunch(false);
      } else {
        AsyncStorage.setItem('alreadyLaunched', 'true');

        setIsFirstLaunch(true);
      }
    });
  }, []);

  if (isFirstLaunch === null) {
    return null;
  } else if (isFirstLaunch === true) {
    routeName = 'SignInScreen';
  } else {
    routeName = 'Onboarding';
  }
  return (
    <Stack.Navigator initialRouteName={routeName}>
      <Stack.Screen
        name="Onboarding"
        component={Onboarding}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="SignInScreen"
        component={SignInScreen}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="SignUpScreen"
        component={SignUpScreen}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}
        options={{header: () => null}}
      />
    </Stack.Navigator>
  );
};
export default AuthStack;
